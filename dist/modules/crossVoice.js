import CONFIG from "../resources/configuration.js";
const { GUILD_ID, TEXT_CHANNELS, WEBHOOKS } = CONFIG;
const { LEGACY_VOICE_CHANNEL_ID: ARCHIVE_CHANNEL_ID } = TEXT_CHANNELS;
const { LEGACY_VOICE_WEBHOOK_ID } = WEBHOOKS;
import { ChannelType, ThreadAutoArchiveDuration, AttachmentBuilder, } from "discord.js";
const threadsByChannelId = new Map();
const channelsByThreadId = new Map();
export default function (message) {
    // Check if message was sent in Makeshift guild
    const guild = message.guild;
    if (guild?.id !== GUILD_ID) {
        // Message was sent in a different guild
        return;
    }
    // Check if message was sent by a user
    if (message.webhookId) {
        // Message was sent by a webhook
        // This is probably a relayed message
        return;
    }
    if (message.author.bot) {
        // Message was sent by a bot
        // This happens when a bot creates a thread
        return;
    }
    // Check if message was sent in a voice channel
    const channel = message.channel;
    if (channel.type === ChannelType.GuildVoice) {
        // Message was sent in a voice channel
        // Relay it to the corresponding archive channel thread
        relayMessageFromVoiceChannelToArchiveThread(message).catch(console.error);
    }
    // Check if message was sent somewhere in the archive channel
    let channelId;
    if (channel.type === ChannelType.PublicThread) {
        // Message was sent in a thread
        channelId = channel.parent?.id;
    }
    else {
        // Message was sent in the root channel
        channelId = channel.id;
    }
    if (channelId === ARCHIVE_CHANNEL_ID) {
        // Message was sent somewhere in the archive channel
        // Relay it to the corresponding voice channel
        relayMessageFromArchiveToVoiceChannel(message).catch(console.error);
    }
}
async function relayMessageFromArchiveToVoiceChannel(message) {
    // Step 1: Get the thread
    let voiceChannel;
    const channelType = message.channel.type;
    if (channelType === ChannelType.PublicThread) {
        // Message was sent in a thread
        // Send to the registered corresponding voice channel
        voiceChannel = channelsByThreadId.get(message.channel.id);
    }
    else {
        // Message was sent in root channel
        // Send to the channel the user is currently in
        const member = message.member;
        voiceChannel = member.voice.channel;
    }
    if (!voiceChannel) {
        // No voice channel to relay to
        // This only happens if the bot is restarted while a thread is active
        return;
    }
    // Step 2: Get the webhook
    const webhook = await getWebhook(voiceChannel);
    // Step 3: Relay the message
    await sendWebhookMessage(webhook, message);
}
async function relayMessageFromVoiceChannelToArchiveThread(message) {
    // Step 1: Get the archive channel
    const channel = message.channel;
    const guild = channel.guild;
    const channels = guild.channels;
    const archiveChannel = await channels.fetch(ARCHIVE_CHANNEL_ID);
    if (!archiveChannel) {
        // Probably failed to fetch the channel
        throw new Error("Archive channel not found");
    }
    if (archiveChannel.type !== ChannelType.GuildText) {
        // If this ever happens, ARCHIVE_CHANNEL_ID was misconfigured or Discord now allows text channels to be converted to voice channels
        throw new Error("Archive channel is not a text channel");
    }
    // Step 2: Get the thread
    let thread = threadsByChannelId.get(channel.id);
    const channelId = channel.id;
    const date = new Date().toISOString();
    if (!thread) {
        // Create the thread
        thread = await archiveChannel.threads.create({
            name: `Archive of ${channelId} @${date}`,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
        });
        threadsByChannelId.set(channel.id, thread);
        channelsByThreadId.set(thread.id, channel);
    }
    // Step 3: Get the webhook
    const webhook = await getWebhook(archiveChannel);
    // Step 4: Relay the message
    await sendWebhookMessage(webhook, message, thread);
}
async function sendWebhookMessage(webhook, message, thread) {
    const member = message.member;
    const files = message.attachments.map((attachment) => {
        const attachmentBuilder = new AttachmentBuilder(attachment.url);
        attachmentBuilder.setName(attachment.name);
        return attachmentBuilder;
    });
    // Send the message
    await webhook.send({
        content: message.content,
        username: member.displayName,
        avatarURL: member.user.avatarURL() ?? undefined,
        files,
        threadId: thread?.id,
    });
}
async function getWebhook(channel) {
    const guild = channel.guild;
    const webhooks = await guild.fetchWebhooks();
    const webhook = webhooks.get(LEGACY_VOICE_WEBHOOK_ID);
    if (!webhook) {
        // Probably failed to fetch the webhook
        throw new Error("Archive webhook not found");
    }
    if (webhook.channelId !== channel.id) {
        await webhook.edit({ channel });
    }
    return webhook;
}

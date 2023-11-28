import CONFIG from "../resources/configuration.js";
const { GUILD_ID, TEXT_CHANNELS, WEBHOOKS } = CONFIG;
const { LEGACY_VOICE_CHANNEL_ID: ARCHIVE_CHANNEL_ID } = TEXT_CHANNELS;
const { LEGACY_VOICE_WEBHOOK_ID } = WEBHOOKS;
import { ChannelType, AttachmentBuilder, } from "discord.js";
export default async function (message) {
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
        await relayMessageFromVoiceChannelToArchiveThread(message).catch(console.error);
    }
    // Check if message was sent in the root archive channel
    if (channel.id === ARCHIVE_CHANNEL_ID) {
        // Message was sent in the root archive channel
        // Relay it to the corresponding voice channel
        await relayMessageFromArchiveToVoiceChannel(message).catch(console.error);
    }
}
async function relayMessageFromArchiveToVoiceChannel(message) {
    // Step 1: Get the voice channel
    const member = message.member;
    const targetChannel = member.voice.channel;
    if (!targetChannel) {
        // Member is not in a voice channel
        return;
    }
    // Step 2: Relay the message
    await sendWebhookMessage(targetChannel, message);
}
async function relayMessageFromVoiceChannelToArchiveThread(message) {
    // Step 1: Get the archive channel
    const channel = message.channel;
    const channels = channel.guild.channels;
    const targetChannel = await channels.fetch(ARCHIVE_CHANNEL_ID);
    if (!targetChannel) {
        // Probably failed to fetch the channel
        throw new Error("Archive channel not found");
    }
    if (targetChannel.type !== ChannelType.GuildText) {
        // If this ever happens, ARCHIVE_CHANNEL_ID was misconfigured or Discord now allows text channels to be converted to voice channels
        throw new Error("Archive channel is not a text channel");
    }
    // Step 2: Relay the message
    await sendWebhookMessage(targetChannel, message);
}
async function sendWebhookMessage(targetChannel, originalMessage) {
    // Step 1: Get the webhook
    const guild = targetChannel.guild;
    const webhooks = await guild.fetchWebhooks();
    const webhook = webhooks.get(LEGACY_VOICE_WEBHOOK_ID);
    if (!webhook) {
        // Probably failed to fetch the webhook
        throw new Error("Archive webhook not found");
    }
    if (webhook.channelId !== targetChannel.id) {
        await webhook.edit({ channel: targetChannel });
    }
    // Step 2: Get the files and member
    const files = originalMessage.attachments.map((attachment) => {
        const attachmentBuilder = new AttachmentBuilder(attachment.url);
        attachmentBuilder.setName(attachment.name);
        return attachmentBuilder;
    });
    const member = originalMessage.member;
    // Step 3: Send the message
    await webhook.send({
        content: originalMessage.content,
        username: member.displayName,
        avatarURL: member.user.avatarURL() ?? undefined,
        files,
    });
}

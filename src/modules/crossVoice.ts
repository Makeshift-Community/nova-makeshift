import axios from "axios";
import CONFIG from "../resources/configuration.js";
const { GUILD_ID, TEXT_CHANNELS, WEBHOOKS } = CONFIG;
const { LEGACY_VOICE_CHANNEL_ID: ARCHIVE_CHANNEL_ID } = TEXT_CHANNELS;
const { LEGACY_VOICE_WEBHOOK_ID } = WEBHOOKS;

import {
  Message,
  ChannelType,
  ThreadChannel,
  ThreadAutoArchiveDuration,
  VoiceChannel,
  GuildMember,
  TextChannel,
  AttachmentBuilder,
  AttachmentData,
  Webhook,
  Attachment,
} from "discord.js";

const threadsByChannelId = new Map<string, ThreadChannel>();
const channelsByThreadId = new Map<string, VoiceChannel>();

export default function (message: Message) {
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
  } else {
    // Message was sent in the root channel
    channelId = channel.id;
  }
  if (channelId === ARCHIVE_CHANNEL_ID) {
    // Message was sent somewhere in the archive channel
    // Relay it to the corresponding voice channel
    relayMessageFromArchiveToVoiceChannel(message).catch(console.error);
  }
}

async function relayMessageFromArchiveToVoiceChannel(message: Message) {
  // Step 1: Get the thread
  let voiceChannel;
  const channelType = message.channel.type;
  if (channelType === ChannelType.PublicThread) {
    // Message was sent in a thread
    // Send to the registered corresponding voice channel
    voiceChannel = channelsByThreadId.get(message.channel.id);
  } else {
    // Message was sent in root channel
    // Send to the channel the user is currently in
    const member = message.member as GuildMember;
    voiceChannel = member.voice.channel as VoiceChannel;
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

async function relayMessageFromVoiceChannelToArchiveThread(message: Message) {
  // Step 1: Get the archive channel
  const channel = message.channel as VoiceChannel;
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

async function downloadAttachment(attachment: Attachment): Promise<AttachmentBuilder> { // Replace AttachmentType with the actual type of your attachment
  const response = await axios.get<ArrayBuffer>(attachment.url, {
    responseType: 'arraybuffer'
  });
  const buffer = Buffer.from(response.data);
  const attachmentData: AttachmentData = {
    name: attachment.name
  };
  return new AttachmentBuilder(buffer, attachmentData);
}

async function sendWebhookMessage(webhook : Webhook, message: Message, thread?: ThreadChannel) {
  const member = message.member as GuildMember;
  // Download files with axios
  const files = await Promise.all(
    message.attachments.map(attachment => downloadAttachment(attachment))
  );

  // Send the message
  await webhook.send({
    content: message.content,
    username: member.displayName,
    avatarURL: member.user.avatarURL() ?? undefined,
    files,
    threadId: thread?.id,
  });
}

async function getWebhook(channel: VoiceChannel | TextChannel) {
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

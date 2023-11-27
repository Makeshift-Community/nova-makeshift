import CONFIG from "../resources/configuration.js"
const { GUILD_ID, TEXT_CHANNELS, WEBHOOKS } = CONFIG;
const { LEGACY_VOICE_CHANNEL_ID } = TEXT_CHANNELS;
const { LEGACY_VOICE_WEBHOOK_ID } = WEBHOOKS;

import { Message, ChannelType, ThreadChannel, ThreadAutoArchiveDuration, VoiceChannel, GuildMember, Guild, TextChannel, EmbedBuilder,  } from "discord.js";

const threadsByChannelId = new Map<string, ThreadChannel>();
const channelsByThreadId = new Map<string, VoiceChannel>();

export default function (message: Message) {
  // Check if message was sent in Makeshift guild
  const guild = message.guild;
  if (guild?.id !== GUILD_ID) {
    return;
  }

  // Check if message was sent by a user
  if(message.webhookId) {
    return;
  }
  if(message.author.bot) {
    return;
  }

  const channel = message.channel;
  if(channel.type === ChannelType.GuildVoice) {
    // Message was sent in a voice channel
    // Relay it to the corresponding legacy voice channel thread
    relayMessageFromVoiceChannelToLegacyThread(message)
      .catch(console.error);
  }

  let channelId;
  if(channel.type === ChannelType.PublicThread) {
    channelId = channel.parent?.id;
  } else {
    channelId = channel.id;
  }
  if(channelId === LEGACY_VOICE_CHANNEL_ID) {
    console.log("threadToVoice")
    // Message was sent somewhere in the legacy voice channel
    // Relay it to the corresponding voice channel
    relayMessageFromLegacyToVoiceChannel(message)
      .catch(console.error);
  }
}

async function relayMessageFromLegacyToVoiceChannel(message : Message) {
  // Step 1: Get the thread
  const thread = message.thread;
  let voiceChannel;
  if(thread === null) {
    // Message was sent in root channel
    const member = message.member as GuildMember;
    voiceChannel = member.voice.channel as VoiceChannel;
  }
  else {
    // Message was sent in a thread
    voiceChannel = channelsByThreadId.get(thread.id);
  }
  if(!voiceChannel) {
    // Member is not in a voice channel
    // Nothing to relay
    return;
  }

  // Step 2: Get the webhook
  const webhook = await getWebhook(voiceChannel);
  const member = message.member as GuildMember;
  await webhook.send({
    content: message.content,
    username: member.displayName,
    avatarURL: member.user.avatarURL() ?? undefined,
  });
}

async function relayMessageFromVoiceChannelToLegacyThread(message : Message) {
  // Step 1: Get legacy voice channel
  const channel = message.channel as VoiceChannel;
  const guild = channel.guild;
  const legacyVoiceChannel = await getLegacyVoiceChannel(guild);

  // Step 2: Get the thread
  let thread = threadsByChannelId.get(channel.id);
  const channelId = channel.id;
  const date = new Date().toISOString();
  if(!thread) {
    // Create the thread
    thread = await legacyVoiceChannel.threads.create({
      name: `Archive of ${channelId} @${date}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
    });
    threadsByChannelId.set(channel.id, thread);
    channelsByThreadId.set(thread.id, channel);
  }

  // Step 2.5: Send a message to the thread
  const startMessage = new EmbedBuilder()
    .addFields([
      {
        name: "Date created",
        value: ,
      },
    ])
  await thread.send({ embeds: [startMessage] })
    .catch(() => {
      console.error("Failed to send start message");
    });

  // Step 3: Get the webhook
  const webhook = await getWebhook(legacyVoiceChannel);

  // Step 4: Relay the message
  const member = message.member as GuildMember;
  await webhook.send({
    content: message.content,
    username: member.displayName,
    avatarURL: member.user.avatarURL() ?? undefined,
    threadId: thread.id,
  });
}

async function getLegacyVoiceChannel(guild: Guild) {
  const channels = guild.channels;
  const legacyVoiceChannel = await channels.fetch(LEGACY_VOICE_CHANNEL_ID);
  if (!legacyVoiceChannel) {
    // Probably failed to fetch the channel
    throw new Error("Legacy voice channel not found");
  }
  if (legacyVoiceChannel.type !== ChannelType.GuildText) {
    // If this ever happens, LEGACY_VOICE_CHANNEL_ID was misconfigured or Discord now allows text channels to be converted to voice channels
    throw new Error("Legacy voice channel is not a text channel");
  }
  return legacyVoiceChannel;
}

async function getWebhook(channel: VoiceChannel | TextChannel) {
  const guild = channel.guild;
  const webhooks = await guild.fetchWebhooks();
  const webhook = webhooks.get(LEGACY_VOICE_WEBHOOK_ID);
  if (!webhook) {
    // Probably failed to fetch the webhook
    throw new Error("Legacy voice webhook not found");
  }
  if (webhook.channelId !== channel.id) {
    await webhook.edit({ channel });
  }
  return webhook;
}

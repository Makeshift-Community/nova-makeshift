import CONFIG from "../resources/configuration.js";
const { GUILD_ID, VOICE_CHANNELS, VOICE_CATEGORY_ID, ROLES, SETTINGS } = CONFIG;
const PROTECTED_CHANNEL_IDS = [
  VOICE_CHANNELS.LOBBY_CHANNEL_ID,
  VOICE_CHANNELS.AFK_CHANNEL_ID,
];
const { VOICE_ROLE_ID } = ROLES;
const { VOICE_CHANNEL_DELETION_TIMEOUT } = SETTINGS;

import {
  CategoryChannel,
  ChannelType,
  Collection,
  GuildChannelCreateOptions,
  GuildChannelEditOptions,
  VoiceBasedChannel,
  VoiceChannel,
  VoiceState,
} from "discord.js";
import { setTimeout } from "node:timers/promises";
import _ from "lodash";

const channelExpirationTimestamps = new Map<string, number>();

const CHANNEL_NAMES = [
  "Ash",
  "Atlas",
  "Banshee",
  "Baruuk",
  "Caliban",
  "Chroma",
  "Citrine",
  "Dagath",
  "Ember",
  "Equinox",
  "Excalibur",
  "Frost",
  "Gara",
  "Garuda",
  "Gauss",
  "Grendel",
  "Gyre",
  "Harrow",
  "Hildryn",
  "Hydroid",
  "Inaros",
  "Ivara",
  "Khora",
  "Kullervo",
  "Lavos",
  "Limbo",
  "Loki",
  "Mag",
  "Mesa",
  "Mirage",
  "Nekros",
  "Nezha",
  "Nidus",
  "Nova",
  "Nyx",
  "Oberon",
  "Octavia",
  "Protea",
  "Revenant",
  "Rhino",
  "Saryn",
  "Sevagoth",
  "Styanax",
  "Titania",
  "Trinity",
  "Valkyr",
  "Vauban",
  "Volt",
  "Voruna",
  "Wisp",
  "Wukong",
  "Xaku",
  "Yareli",
  "Zephyr",
];

/**
 * Handles the event when a member's voice channel changes in the Makeshift guild.
 * Assigns potential empty channel and voice role to the member.
 * Revokes the voice role from the member.
 * Cleans up the previous voice channel if it was left empty.
 *
 * @param oldState - The previous state of the member's voice connection.
 * @param newState - The new state of the member's voice connection.
 */
export default async function (oldState: VoiceState, newState: VoiceState) {
  // Check if this happened on the Makeshift guild
  const guild = newState.guild;
  if (guild.id !== GUILD_ID) return;

  // Make sure member voice channel changed
  // Otherwise, we don't need to do anything
  const currentVoiceChannel = newState.channel;
  const previousVoiceChannel = oldState.channel;
  if (currentVoiceChannel?.id === previousVoiceChannel?.id) return;

  // Assign or revoke voice role
  if (currentVoiceChannel === null) {
    // Member left voice channel, revoke voice role
    await revokeVoiceRole(newState).catch(console.error);
  } else {
    // Member joined voice channel, assign voice role
    await assignVoiceRole(newState).catch(console.error);
  }

  // Member has changed voice channel, make sure there's always one empty voice channel
  const voiceCategory = await fetchVoiceCategory(newState);
  const emptyVoiceChannels = findEmptyVoiceChannels(voiceCategory);
  if (emptyVoiceChannels.size === 0) {
    await createVoiceChannel(voiceCategory);
  } else if (emptyVoiceChannels.size > 1) {
    // Do not wait for clean up to finish, this can take a while
    cleanUp(emptyVoiceChannels).catch(console.error);
  }
}

/**
 * Assigns a voice role to the member associated with the given voice state.
 * If the member is not connected to any voice channel, no action is taken.
 * If the voice role does not exist, an error is thrown.
 * If the member already has the voice role assigned, no action is taken.
 *
 * @param voiceState - The voice state of the member.
 * @throws Error - If the voice role is not found or the member is not cached.
 */
async function assignVoiceRole(voiceState: VoiceState) {
  // Connected to voice channel
  // Check to see if voice role already exists
  const voiceRole = await voiceState.guild.roles.fetch(VOICE_ROLE_ID);
  if (voiceRole === null) {
    console.error("Voice role not found");
    throw new Error("Voice role not found");
  }
  const member = voiceState.member;
  if (member === null) {
    console.error("Member not cached");
    throw new Error("Member not cached");
  }
  if (member.roles.cache.has(voiceRole.id)) {
    // Voice role already assigned
    return;
  }

  // Voice role not assigned yet, assign it
  await member.roles.add(voiceRole);
}

/**
 * Revokes the voice role from the given voice state.
 * If the member is not connected to any voice channel, the voice role is revoked.
 * If the voice role does not exist or the member is not cached, an error is thrown.
 * @param voiceState - The voice state to revoke the voice role from.
 * @throws Error - If the voice role is not found or the member is not cached.
 */
async function revokeVoiceRole(voiceState: VoiceState) {
  // Not connected to voice channel
  // Check to see if voice role already exists
  const voiceRole = await voiceState.guild.roles.fetch(VOICE_ROLE_ID);
  if (voiceRole === null) {
    console.error("Voice role not found");
    throw new Error("Voice role not found");
  }
  const member = voiceState.member;
  if (member === null) {
    console.error("Member not cached");
    throw new Error("Member not cached");
  }
  if (!member.roles.cache.has(voiceRole.id)) {
    // Voice role already revoked
    return;
  }

  // Voice role not revoked yet, revoke it
  await member.roles.remove(voiceRole);
}

async function fetchVoiceCategory(
  voiceState: VoiceState,
): Promise<CategoryChannel> {
  const voiceCategory =
    await voiceState.guild.channels.fetch(VOICE_CATEGORY_ID);
  if (voiceCategory === null) {
    console.error("Voice category not found");
    throw new Error("Voice category not found");
  }
  if (voiceCategory.type !== ChannelType.GuildCategory) {
    console.error("Voice category is not a category");
    throw new Error("Voice category is not a category");
  }

  // Fetch all channels in category
  await voiceCategory.fetch();

  return voiceCategory;
}

/**
 * Finds an empty voice channel within a given voice category.
 * @param voiceCategory - The voice category to search within.
 * @returns The empty voice channel if found, otherwise undefined.
 */
function findEmptyVoiceChannels(
  voiceCategory: CategoryChannel,
): Collection<string, VoiceChannel> {
  // Check if there's an empty voice channel
  const emptyVoiceChannels = voiceCategory.children.cache
    .filter((channel): channel is VoiceChannel => {
      // Filter out non-voice channels
      return channel.type === ChannelType.GuildVoice;
    })
    .filter((channel) => {
      // Remove AFK channel from list of empty channels
      return channel.id !== VOICE_CHANNELS.AFK_CHANNEL_ID;
    })
    .filter((channel) => {
      // Filter out non-empty channels
      return channel.members.size === 0;
    });
  return emptyVoiceChannels;
}

/**
 * Creates a voice channel in the specified voice category.
 * The channel is created as the second last channel in the category.
 * @param voiceCategory - The voice category where the channel will be created.
 * @returns A promise that resolves to the created voice channel.
 */
async function createVoiceChannel(
  voiceCategory: CategoryChannel,
): Promise<VoiceChannel> {
  const prefix = _.sample(CHANNEL_NAMES);
  const suffix = (Date.now() / 1000)
    .toString(16)
    .padStart(2, "0")
    .slice(-2)
    .toLocaleUpperCase()
    .split("")
    .join("-");
  const channelName = `${prefix} ${suffix}`;
  const voiceChannels = voiceCategory.children.cache.filter(
    (channel): channel is VoiceChannel => {
      // Filter out non-voice channels
      return channel.type === ChannelType.GuildVoice;
    },
  );
  const secondLastPosition = voiceChannels.size - 2;
  const options: GuildChannelCreateOptions & { type: ChannelType.GuildVoice } =
    {
      name: channelName,
      type: ChannelType.GuildVoice,
      parent: voiceCategory,
      position: secondLastPosition,
    };
  const channel = await voiceCategory.guild.channels.create(options);
  return channel;
}

async function cleanUp(voiceChannels: Collection<string, VoiceChannel>) {
  // Queue channels for deletion
  const deletableVoiceChannels = queueChannelsForDeletion(voiceChannels);

  // Channels need to be deleted, schedule for potential deletion in 60s
  await setTimeout(VOICE_CHANNEL_DELETION_TIMEOUT);

  // Delete channels
  await deleteChannels(deletableVoiceChannels);
}

function queueChannelsForDeletion(
  voiceChannels: Collection<string, VoiceChannel>,
) {
  const deletableVoiceChannels = voiceChannels
    .filter((channel) => {
      // Sanity check: Check if channel is protected and as thus should not be deleted
      for (const protectedChannelId of PROTECTED_CHANNEL_IDS) {
        const isNotProtected = channel.id !== protectedChannelId;
        return isNotProtected;
      }
    })
    .filter((channel) => {
      // Check if channel is empty
      const isEmpty = channel.members.size === 0;
      return isEmpty;
    })
    .filter((channel) => {
      // Check if channel has not been queued for deletion yet
      const hasBeenQueued = channelExpirationTimestamps.has(channel.id);
      return !hasBeenQueued;
    });
  deletableVoiceChannels.forEach((channel) => {
    // Give channel an expiration timestamp
    const now = Date.now();
    const deleteAfterTimestamp = now + VOICE_CHANNEL_DELETION_TIMEOUT;
    channelExpirationTimestamps.set(channel.id, deleteAfterTimestamp);
  });
  return deletableVoiceChannels;
}

async function deleteChannels(voiceChannels: Collection<string, VoiceChannel>) {
  const deletableVoiceChannels = voiceChannels
    .filter((channel) => {
      // Check if voice channel still exists
      const channelExists = channel.guild.channels.cache.has(channel.id);
      return channelExists;
    })
    .filter((channel) => {
      // Check if channel is deletable already
      const now = Date.now();
      const deletionTimestamp = channelExpirationTimestamps.get(channel.id);
      if (deletionTimestamp === undefined) return false;
      const isDeletable = now >= deletionTimestamp;
      return isDeletable;
    });

  // Delete channels
  for (const channel of deletableVoiceChannels.values()) {
    await deleteChannel(channel);
  }
}

async function deleteChannel(voiceChannel: VoiceBasedChannel) {
  // Prevent members from joining voice channel. This is to prevent a race condition where someone joins the channel just before it gets deleted.
  const channelFreezeOptions: GuildChannelEditOptions = {
    userLimit: 0,
  };
  await voiceChannel.edit(channelFreezeOptions);

  // Check if there's no person in the channel.
  if (voiceChannel.members.first()) {
    // Someone connected in the mean time, unlock again
    const channelUnfreezeOptions: GuildChannelEditOptions = {
      userLimit: undefined,
    };
    await voiceChannel.edit(channelUnfreezeOptions);
    return;
  }

  // Delete channel
  await voiceChannel.delete();

  // Clean up from map
  channelExpirationTimestamps.delete(voiceChannel.id);
}

/**
 * There might still be a bug where the voice channel that is supposed to be cleaned up
 * does not get deleted or does not get its new deletion timestamp bumped.
 */

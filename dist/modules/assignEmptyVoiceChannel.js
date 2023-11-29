import CONFIG from "../resources/configuration.js";
const { GUILD_ID, VOICE_CHANNELS, VOICE_CATEGORY_ID, ROLES } = CONFIG;
const PROTECTED_CHANNEL_IDS = [
    VOICE_CHANNELS.LOBBY_CHANNEL_ID,
    VOICE_CHANNELS.AFK_CHANNEL_ID,
];
const { VOICE_ROLE_ID } = ROLES;
import { ChannelType, } from "discord.js";
import { setTimeout } from "node:timers/promises";
const channelNonces = new Map();
/**
 * Handles the event when a member's voice channel changes in the Makeshift guild.
 * Assigns potential empty channel and voice role to the member.
 * Revokes the voice role from the member.
 * Cleans up the previous voice channel if it was left empty.
 *
 * @param oldState - The previous state of the member's voice connection.
 * @param newState - The new state of the member's voice connection.
 */
export default async function (oldState, newState) {
    // Check if this happened on the Makeshift guild
    if (newState.guild.id !== GUILD_ID)
        return;
    // Make sure member voice channel changed
    const currentVoiceChannel = newState.channel;
    const previousVoiceChannel = oldState.channel;
    if (currentVoiceChannel?.id === previousVoiceChannel?.id)
        return;
    // Member has changed voice channel, assign potential empty channel
    if (currentVoiceChannel?.id === VOICE_CHANNELS.LOBBY_CHANNEL_ID) {
        // Member joined Lobby, assign empty channel
        await assignEmptyVoiceChannel(newState);
    }
    // Assign or revoke voice role
    if (newState.channel === null) {
        // Member left voice channel, revoke voice role
        await revokeVoiceRole(newState);
    }
    else {
        // Member joined voice channel, assign voice role
        await assignVoiceRole(newState);
    }
    // Check to see if previous voice channel exists. A voice channel not existing
    // might be the case if the member just joined a voice channel after not being
    // connected previously.
    if (previousVoiceChannel === null)
        return;
    // A previous channel exists and might have been left empty. Clean up if that's the case.
    await cleanUp(previousVoiceChannel);
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
async function assignVoiceRole(voiceState) {
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
async function revokeVoiceRole(voiceState) {
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
/**
 * Assigns the user to an empty voice channel in the voice category.
 * If no empty voice channel is found, a new one is created.
 * @param voiceState - The voice state of the user.
 * @throws Error if the voice category is not found or is not a category.
 */
async function assignEmptyVoiceChannel(voiceState) {
    const voiceCategory = await voiceState.guild.channels.fetch(VOICE_CATEGORY_ID);
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
    // Get empty voice channel
    let channel = findEmptyVoiceChannel(voiceCategory);
    if (channel === undefined) {
        channel = await createVoiceChannel(voiceCategory);
    }
    await voiceState.setChannel(channel);
}
/**
 * Finds an empty voice channel within a given voice category.
 * @param voiceCategory - The voice category to search within.
 * @returns The empty voice channel if found, otherwise undefined.
 */
function findEmptyVoiceChannel(voiceCategory) {
    const channels = voiceCategory.children.cache;
    const voiceChannels = channels.filter((channel) => {
        return channel.type === ChannelType.GuildVoice;
    });
    const emptyVoiceChannels = voiceChannels.filter((channel) => {
        return !PROTECTED_CHANNEL_IDS.includes(channel.id);
    });
    const emptyVoiceChannel = emptyVoiceChannels.find((channel) => {
        return channel.members.size === 0;
    });
    return emptyVoiceChannel;
}
/**
 * Creates a voice channel in the specified voice category.
 * The channel is created as the second last channel in the category.
 * @param voiceCategory - The voice category where the channel will be created.
 * @returns A promise that resolves to the created voice channel.
 */
async function createVoiceChannel(voiceCategory) {
    const channelName = "Debug";
    const secondLastPosition = voiceCategory.children.cache.size - 2;
    const options = {
        name: channelName,
        type: ChannelType.GuildVoice,
        parent: voiceCategory,
        position: secondLastPosition,
    };
    const channel = await voiceCategory.guild.channels.create(options);
    return channel;
}
async function cleanUp(previousVoiceChannel) {
    const channelId = previousVoiceChannel.id;
    // Check if channel is protected and as thus should not be deleted
    for (const protectedChannelId of PROTECTED_CHANNEL_IDS) {
        if (channelId === protectedChannelId)
            return;
    }
    // Check if channel is empty now
    if (previousVoiceChannel.members.first() !== undefined) {
        return;
    }
    // Give channel a nonce
    const channelNonce = (channelNonces.get(previousVoiceChannel.id) ?? 0) + 1;
    channelNonces.set(channelId, channelNonce);
    // Channel needs to be deleted, schedule for potential deletion in 60s
    await setTimeout(60e3);
    // Check if voice channel still exists
    const channelExists = previousVoiceChannel.guild.channels.cache.has(channelId);
    if (!channelExists)
        return;
    // Check if nonce still matches. This may not be the case if the channel was previously joined and left again.
    const currentNonce = channelNonces.get(channelId);
    if (currentNonce !== channelNonce)
        return;
    // Prevent members from joining voice channel. This is to prevent a race condition where someone joins the channel just before it gets deleted.
    const channelFreezeOptions = {
        userLimit: 0,
    };
    await previousVoiceChannel.edit(channelFreezeOptions);
    // Check if there's no person in the channel.
    if (previousVoiceChannel.members.first()) {
        // Someone connected in the mean time, unlock again
        const channelUnfreezeOptions = {
            userLimit: undefined,
        };
        await previousVoiceChannel.edit(channelUnfreezeOptions);
        return;
    }
    // Delete channel
    await previousVoiceChannel.delete();
}

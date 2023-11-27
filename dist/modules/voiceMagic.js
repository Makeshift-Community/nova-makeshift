import CONFIG from "../resources/configuration.js";
import { ChannelType, } from "discord.js";
import { setTimeout } from "node:timers/promises";
const { GUILD_ID, VOICE_CHANNELS, VOICE_CATEGORY_ID } = CONFIG;
const PROTECTED_CHANNELS = [
    VOICE_CHANNELS.LOBBY_CHANNEL_ID,
    VOICE_CHANNELS.AFK_CHANNEL_ID,
];
const channelNonces = new Map();
export default async function (oldState, newState) {
    // Check if this happened on the Makeshift guild
    if (newState.guild.id !== GUILD_ID)
        return;
    // Make sure member voice channel changed
    if (newState.channel?.id === oldState.channel?.id)
        return;
    // Member has changed voice channel, assign potential empty channel
    await assignEmptyVoiceChannel(newState);
    // A previous channel might have been left, schedule potential cleanup
    await cleanUp(oldState.channel);
}
async function assignEmptyVoiceChannel(voiceState) {
    // Check to see if connected to Lobby
    if (voiceState.channel?.id !== VOICE_CHANNELS.LOBBY_CHANNEL_ID)
        return;
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
        channel = await createVoiceChannel(voiceState, voiceCategory);
    }
    await voiceState.setChannel(channel);
}
function findEmptyVoiceChannel(voiceCategory) {
    const channels = voiceCategory.children.cache;
    const voiceChannels = channels.filter((channel) => {
        return channel.type === ChannelType.GuildVoice;
    });
    const emptyVoiceChannels = voiceChannels.filter((channel) => {
        return !PROTECTED_CHANNELS.includes(channel.id);
    });
    const emptyVoiceChannel = emptyVoiceChannels.find((channel) => {
        return channel.members.size === 0;
    });
    return emptyVoiceChannel;
}
async function createVoiceChannel(voiceState, voiceCategory) {
    const channelName = "Debug";
    const secondLastPosition = voiceCategory.children.cache.size - 2;
    const options = {
        name: channelName,
        type: ChannelType.GuildVoice,
        parent: voiceCategory,
        position: secondLastPosition,
    };
    const channel = await voiceState.guild.channels.create(options);
    return channel;
}
async function cleanUp(voiceChannel) {
    // Check to see if previous voice channel exists. A voice channel not existing
    // might be the case if the member just joined a voice channel after not being
    // connected previously.
    if (voiceChannel === null) {
        return;
    }
    // Check if channel is protected and as thus should not be deleted
    for (const channel of PROTECTED_CHANNELS) {
        if (voiceChannel.id === channel) {
            return;
        }
    }
    // Check if channel is empty now
    if (voiceChannel.members.first() !== undefined) {
        return;
    }
    // Give channel a nonce
    const channelNonce = (channelNonces.get(voiceChannel.id) ?? 0) + 1;
    channelNonces.set(voiceChannel.id, channelNonce);
    // Channel needs to be deleted, schedule for potential deletion in 30s
    await setTimeout(30e3);
    // Check if voice channel still exists
    const channelExists = voiceChannel.guild.channels.cache.has(voiceChannel.id);
    if (!channelExists) {
        return;
    }
    // Check if nonce still matches. This may not be the case if the channel was previously joined and left again.
    const currentNonce = channelNonces.get(voiceChannel.id);
    if (currentNonce !== channelNonce) {
        return;
    }
    // Prevent members from joining voice channel. This is to prevent a race condition where someone joins the channel just before it gets deleted.
    const channelFreezeOptions = {
        userLimit: 0,
    };
    await voiceChannel.edit(channelFreezeOptions);
    // Check if there's no person in the channel.
    if (voiceChannel.members.first()) {
        // Someone connected in the mean time, unlock again
        const channelUnfreezeOptions = {
            userLimit: undefined,
        };
        await voiceChannel.edit(channelUnfreezeOptions);
        return;
    }
    // Delete channel
    await voiceChannel.delete();
}

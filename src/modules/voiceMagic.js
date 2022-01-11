import _ from 'lodash'

import { GUILD as GUILD_ID, VOICECHANNELS, CATEGORIES, ROLES } from '../resources/makeshift.js'

const { sample } = _
const CATEGORY_ID = CATEGORIES.VOICE

const CHANNEL_NAMES = [
  "The Fappin' Room 2.0",
  "Akkad n' Chill",
  'The Nuthouse',
  'Nerding Grounds',
  'Do Emojis work here? 🤔',
  'channelNames[Math.random(6)]',
  'Your ad here!',
  "I'm out of ideas...",
  'Fresh Memes!',
  'Midlife crisis',
  'asdf',
  'Very creative channel name',
  'Who even reads these?',
  'Not the Lobby',
  'Makeshift relay',
  'Dojo',
  'Endo my Life',
  'Stale Memes!',
  "Aniki's Dungeon",
  'Disappointments Inc.',
  'Boomers anonymous',
  'Crab Makeshift one crab crab',
  'mmMmMMm gaming...',
  'Hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
  'Can I uhhhhhhhhhhh',
  '🦀 Content is Gone 🦀',
  'H',
  'Computer'
]

export default async function (oldState, newState) {
  // Check if this happened on the Makeshift guild
  if (newState.guild.id !== GUILD_ID) { return }
  // Check if member voice channel changed
  if (newState.channel.id === oldState.channel.id) { return }

  if (newState.channel !== undefined) {
    // Member just connected to a new voice channel
    await assignVoiceRole(newState.member)
    await assignEmptyVoiceChannel(newState)
  } else {
    // Member just disconnected
    removeVoiceRole(newState.member)
  }

  // A previous channel was left, potential cleanup necessary.
  scheduleCleanup(oldState.channel)
}

async function assignEmptyVoiceChannel (voiceState) {
  // Check to see if connected to Lobby
  if (voiceState.channel.id !== VOICECHANNELS.LOBBY) return

  const channelName = sample(CHANNEL_NAMES)
  const category = await voiceState.guild.channels.fetch(CATEGORY_ID)
  await category.fetch(false) // Fetch children
  const options = {
    type: 'GUILD_VOICE',
    permissionOverwrites: [
      {
        type: 'member',
        id: voiceState.member.id,
        allow: 17825808
      }
    ],
    position: category.children.size - 3,
    reason: `Requested by ${voiceState.member.displayName}`
  }

  try {
    // Create new channel
    const channel = await voiceState.guild.channels.create(channelName, options)
    // Move member into new channel
    await voiceState.setChannel(channel)
  } catch (error) {
    console.error(error)
  }
}

async function assignVoiceRole (member) {
  const memberVoiceRole = member.roles.cache.has(ROLES.VOICE)
  if (memberVoiceRole !== undefined) { return }
  // Member doesn't have voice role yet, so they must have recently connected

  await member.roles.add(ROLES.VOICE)
    .catch(console.error)
}

async function removeVoiceRole (member) {
  const memberVoiceRole = member.roles.cache.has(ROLES.VOICE)
  if (memberVoiceRole === undefined) { return }
  // Member still has voice role, remove

  await member.roles.remove(ROLES.VOICE)
    .catch(console.error)
}

function scheduleCleanup (voiceChannel) {
  // Check to see if previous voice channel exists. A voice channel not existing
  // might be the case if the member just joined a voice channel after not being
  // connected previously.
  if (voiceChannel === undefined) { return }
  // Check if channel is protected and as thus should not be deleted
  const PROTECTED_CHANNELS = [
    VOICECHANNELS.LOBBY,
    VOICECHANNELS.AFK
  ]
  for (const channel of PROTECTED_CHANNELS) {
    if (voiceChannel.id === channel) { return }
  }
  // Check if channel is empty
  if (voiceChannel.members.first() === undefined) { return }

  // Channel needs to be deleted, queue for deletion after 30s
  setTimeout(cleanupVoiceChannel, 30e3)
}

async function cleanupVoiceChannel (voiceChannel) {
  try {
    await voiceChannel.fetch()
    // Check if voice channel still exists
    if (voiceChannel === undefined) { return }
    // TODO: Lock voice channel
    // voiceChannel.
    // Check if there's no person in the channel
    if (voiceChannel.members.first()) {
      // TODO: Someone connected in the mean time, unlock again
      // voiceChannel.
      return
    }
    // Delete channel
    await voiceChannel.delete()
  } catch (error) {
    console.error(error)
  }
}

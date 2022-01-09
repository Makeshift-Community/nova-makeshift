import _ from 'lodash'

import { GUILD as GUILD_ID, VOICECHANNELS, CATEGORIES, ROLES } from '../resources/makeshift.js'

const { sample } = _
const CATEGORY_ID = CATEGORIES.VOICE

let traceIdMaster = 0

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
  'Crab Makeshift one crab crab'
]

export default async function (oldState, newState) {
  // Check if this happened on the Makeshift guild
  if (newState.guild.id !== GUILD_ID) { return }
  // Check if member voice channel changed
  if (newState.channel.id === oldState.channel.id) { return }

  const traceId = traceIdMaster++

  if (newState.channel !== undefined) {
    // Member just connected to a new voice channel
    await assignVoiceRole(newState.member, traceId)
    fetchEmptyVoiceChannel(newState, traceId)
  } else {
    // Member just disconnected
    removeVoiceRole(newState.member, traceId)
  }

  // A previous channel was left, potential cleanup necessary.
  scheduleCleanup(oldState.channel, traceId)
}

async function fetchEmptyVoiceChannel (voiceState, traceId) {
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
    if (process.env.DEBUG) console.log(`VOICEMAGIC A 00 (ID: ${traceId})`)
    // Create new channel
    const channel = await voiceState.guild.channels.create(channelName, options)
    if (process.env.DEBUG) console.log(`VOICEMAGIC A 01 (ID: ${traceId})`)
    // Move member into new channel
    await voiceState.setChannel(channel)
    if (process.env.DEBUG) console.log(`VOICEMAGIC A 02 (ID: ${traceId})`)
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

async function removeVoiceRole (member, traceId) {
  const memberVoiceRole = member.roles.cache.has(ROLES.VOICE)
  if (memberVoiceRole === undefined) { return }
  // Member still has voice role, remove

  await member.roles.remove(ROLES.VOICE)
    .catch(console.error)
}

function scheduleCleanup (voiceChannel, traceId) {
  // Check to see if previous voice channel exists
  // This could be the case if a member just joined VC while not being previously connected
  if (!voiceChannel) return
  // Check if channel is empty
  if (voiceChannel.members.first()) return
  const protectedChannels = [
    makeshift.channels.voice.lobby,
    makeshift.channels.voice.afk
  ]

  // Check to see if channel is protected
  var protectedChannel = false
  protectedChannels.forEach(channel => {
    if (voiceChannel.id === channel) protectedChannel = true
  })
  if (protectedChannel) return

  if (process.env.DEBUG) console.log(`VOICEMAGIC D 00 (ID: ${traceId})`)

  // Queue channel for deletion and wait 30s
  setTimeout(cleanupVoiceChannel, 30e3)
}

const cleanupVoiceChannel = async function () {
  try {
    voiceChannel.fetch()
    if (process.env.DEBUG) console.log(`VOICEMAGIC D 01 (ID: ${traceId})`)
    // Check if voice channel still exists
    if (voiceChannel === undefined) return
    // Lock voice channel
    // voiceChannel.
    // Check if there's no person in the channel
    if (voiceChannel.members.first()) {
      // Someone connected in the mean time, unlock again
      // voiceChannel.
      return
    }
    if (process.env.DEBUG) console.log(`VOICEMAGIC D 02 (ID: ${traceId})`)
    // Delete channel
    await voiceChannel.delete()
    if (process.env.DEBUG) console.log(`VOICEMAGIC D 03 (ID: ${traceId})`)
  } catch (error) {
    console.error(error)
  }
}

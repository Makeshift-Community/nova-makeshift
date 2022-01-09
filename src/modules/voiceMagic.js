import { sample } from "lodash"

//Config
const makeshift = require("../resources/makeshift.json")

var traceIdMaster = 0

const channelNames = [
	"The Fappin' Room 2.0",
	"Akkad n' Chill",
	"The Nuthouse",
	"Nerding Grounds",
	"Do Emojis work here? 🤔",
	"channelNames[Math.random(6)]",
	"Your ad here!",
	"I'm out of ideas...",
	"Fresh Memes!",
	"Midlife crisis",
	"asdf",
	"Very creative channel name",
	"Who even reads these?",
	"Not the Lobby",
	"Makeshift relay",
	"Dojo",
	"Endo my Life",
	"Stale Memes!",
	"Aniki's Dungeon",
	"Disappointments Inc.",
	"Boomers anonymous",
	"Crab Makeshift one crab crab"
]

/**
 * Handles the voice channels on the Makeshift guild. Creates a new channel upon joining the lobby, grants members the voice role and deltes unused channels.
 * @param {*} client The bot client.
 */
module.exports = function(client){
	client.on("voiceStateUpdate", (oldState, newState) => {
		
		//Check if this happened on the Makeshift guild
		if(newState.guild.id !== makeshift.guild) return
		//Check if member voiceChannel changed
		if(newState.channelID === oldState.channelID) return

		const traceId = traceIdMaster++

		if (newState.channel) {//If connected to VC currently
			//@voice role
			(async()=>{
				await assign_role_voice(newState.member, traceId)
				create_new_voiceChannel(newState, traceId)
			})()
		}
		//@voice role
		else {//if disconnected from voice
			remove_role_voice(newState.member, traceId)
		}
		
		//Potentially clean up after switching to new channel
		cleanup_empty_voiceChannel(oldState.channel, traceId)

	})
}

async function create_new_voiceChannel(voiceState, traceId){
	//Check to see if connected to Lobby
	if(voiceState.channelID !== makeshift.channels.voice.lobby) return

	const channelNames = require("./resources/channelNames.json")
	let name = sample(channelNames)
	//const name = "Talk " + (newMember.guild.channels.get(makeshift.categories.voice).children.filter(child => child.type == "voice").size - 1)
	const options = {
		type: "voice",
		parent: voiceState.guild.channels.get(makeshift.categories.voice),
		permissionOverwrites: [
			{	//Make first member in channel owner
				type: "member",
				id: voiceState.member.id,
				allow: 17825808
			}
		],
		position: voiceState.guild.channels.get(makeshift.categories.voice).children.size - 3,
		reason: `Requested by ${voiceState.member} (${voiceState.member.displayName})`
	}
	
	try {
		if(process.env.DEBUG) console.log(`VOICEMAGIC A 00 (ID: ${traceId})`)
		//Create new channel
		let channel = await voiceState.guild.channels.create(name, options)
		if(process.env.DEBUG) console.log(`VOICEMAGIC A 01 (ID: ${traceId})`)
		//Move member into new channel
		await voiceState.setChannel(channel)
		if(process.env.DEBUG) console.log(`VOICEMAGIC A 02 (ID: ${traceId})`)
	} catch (error) {
		console.error(error)
	}
}

async function assign_role_voice(member, traceId){
	if(member.roles.get(makeshift.roles.voice)) return //member doesn't have @voice role (recently connected)
	try {
		if(process.env.DEBUG) console.log(`VOICEMAGIC B 00 (ID: ${traceId})`)
		await member.roles.add(makeshift.roles.voice)
		if(process.env.DEBUG) console.log(`VOICEMAGIC B 01 (ID: ${traceId})`)
	} catch (error) {
		console.error(error)
	}
}

async function remove_role_voice(member, traceId){
	if(!member.roles.get(makeshift.roles.voice)) return
	try {
		if(process.env.DEBUG) console.log(`VOICEMAGIC C 00 (ID: ${traceId})`)
		await member.roles.remove(makeshift.roles.voice)
		if(process.env.DEBUG) console.log(`VOICEMAGIC C 01 (ID: ${traceId})`)
	} catch (error) {
		console.error(error)
	}
}

function cleanup_empty_voiceChannel(voiceChannel, traceId) {
	//Check to see if previous voice channel exists
	//This could be the case if member just joined VC while not being previously connected
	if(!voiceChannel) return
	//Check if channel is empty
	if(voiceChannel.members.first()) return
	const protectedChannels = [
		makeshift.channels.voice.lobby,
		makeshift.channels.voice.afk
	]
	//Check to see if channel is protected
	var protectedChannel = false
	protectedChannels.forEach(channel => {
		if(voiceChannel.id == channel) protectedChannel = true
	})
	if(protectedChannel) return

	if(process.env.DEBUG) console.log(`VOICEMAGIC D 00 (ID: ${traceId})`)
	//Queue channel for deletion and wait 30s
	setTimeout(async function(){
		try {
			if(process.env.DEBUG) console.log(`VOICEMAGIC D 01 (ID: ${traceId})`)
			//Check if voice channel still exists
			if(!voiceChannel) return
			//Check if there's no person in the channel
			if(voiceChannel.members.first()) return
			if(process.env.DEBUG) console.log(`VOICEMAGIC D 02 (ID: ${traceId})`)
			//Delete channel
			await voiceChannel.delete()
			if(process.env.DEBUG) console.log(`VOICEMAGIC D 03 (ID: ${traceId})`)
		} catch (error) {
			console.error(error)
		}
	}, 30e3)
}

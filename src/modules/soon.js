// Dependencies
const backend = require("../resources/backend.json")

const trigger = /soon$/gi

export default async function(message){
	// Check if message was issued on a guild
	if(message.guild === undefined) {return}
	// Check if message ends with "soon"
	if(trigger.test(message.content) === false) {return}

	const guild = message.client.guilds.fetch(backend.guild)
	const emoji = guild.emojis.fetch(backend.emojis.soontm)
	message.react(emoji)
		.catch(console.error)
}

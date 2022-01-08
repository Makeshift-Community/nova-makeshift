// Dependencies
import { sample } from "lodash"

const trigger = /^Nova,\s/gi
const zephyrTrigger = /zephyr/gi
const responsesRare = [
	"My answer-module broke. Could you ask me again?",
	"Oh my gosh.. 🙄",
	"¯\\\\_(ツ)\\_/¯",
	"Are you okay?",
	"Ask me later",
	"Try again",
	"Don't annoy me",
	"Alright 🙄",
	"You sound like a Limbo-main.",
	"Fuck off."
]
const responsesUncommon = [
	"Not sure",
	"Dunno",
	"WTF?",
	"ಠ_ಠ",
	"Uuuuhhhh~",
	"K",
	"Forget it",
	"._.",
	"Okay",
	"N-No!",
]
const responsesCommon = [
	[
		"Certainly",
		"Yeah",
		"Most likely",
		"Yes",
		"NO!",
		"(☞ﾟヮﾟ)☞           No",
		"Nah",
		"Nope",
		"Doubt it",
		"Nuh-uh~",
		"No.",
		"Never ever",
		"No",
		"How about no?",
		"Absolutely",
		"Why not?",
		"Not really",
		"Negative.",
		"No way!",
		"Absolutely... **NOT!**",
		"👎",
		"👍",
		"Definitely",
		"No?",
		"No Thanks!",
		"Not on my watch",
		"**NEIN!**"
	]
]

export default async function(message){
	if(trigger.test(message.content) === false) {return}

	// Appropriate response to Zephyr
	if(zephyrTrigger.test(message.content) === true) {
		return `Zephyr is a useless piece of shit, stop asking.`
	}

	// Pick randomized answer
	message.channel.send(pickAnswer(message))
		.catch(console.error)
}

function pickAnswer(message){
	const nRandom = Math.random()

	//LEGENDARY
	if((nRandom*1000)<1) return (`Love you, ${message.author} 😘`)
	//RARE
	if((nRandom*15)<1){
		return sample(responsesRare)
	}
	//UNCOMMON
	if((nRandom*5)<1){
		return sample(responsesUncommon)
	}
	//COMMON
	return sample(responsesCommon)
}

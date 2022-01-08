//External dependencies
const commando = require("discord.js-commando")

//Load info
const token = require("./token.json")	//I'm an idiot - Thanks for the lesson

//Create new Discord client
const makeshiftbot = new commando.Client({
	commandPrefix : "!",
	unknownCommandResponse : false,
	owner : "153595272465743872"
})

//Load and register commands.
require("./src/commands/index")(makeshiftbot)

//Load custom modules
require("./src/modules/index")(makeshiftbot)


//*
//Start bot
makeshiftbot.login(token)
	.catch(console.error)
//*/
makeshiftbot.on("ready", () => {
	atNovaHelp(makeshiftbot.user)
})
makeshiftbot.on("resume", ()=> {
	atNovaHelp(makeshiftbot.user)
})

function atNovaHelp(user){
	user.setPresence({
		activity: {
			name: "@Nova help",
			type: "PLAYING"
		}
	})
}

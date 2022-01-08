//External dependencies
import { Client, Intents } from 'discord.js'

// Custom dependencies
import token from './src/resources/token.js' // I'm an idiot, thanks for the lesson

const makeshiftbot = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES]
})

//Load and register commands.
require("./src/commands/index")(makeshiftbot)

//Load custom modules
require("./src/modules/index")(makeshiftbot)

//Start bot
makeshiftbot.login(token)
  .catch(console.error)

//External dependencies
import { Client, Intents } from 'discord.js'

// Custom dependencies
import token from './src/resources/token.js' // I'm an idiot, thanks for the lesson
import registerModules from './src/listeners/index.js'
import registerCommands from "./src/commands/index.js"

const makeshiftbot = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES]
})

registerModules(makeshiftbot)
registerCommands(makeshiftbot)

//Start bot
makeshiftbot.login(token)
  .catch(console.error)

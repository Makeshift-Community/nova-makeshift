// External dependencies
import { Client, Intents } from 'discord.js'

// Custom dependencies
import token from './src/resources/token.js' // I'm an idiot, thanks for the lesson
import registerModules from './src/listeners/index.js'

const makeshiftbot = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES],
  partials: ['CHANNEL', 'GUILD_MEMBER']
})

registerModules(makeshiftbot)

// Start bot
makeshiftbot.login(token)
  .catch(console.error)
  .then(() => {
    makeshiftbot.application.fetch()
    console.log(`Logged in as ${makeshiftbot.user.tag}`)
  })

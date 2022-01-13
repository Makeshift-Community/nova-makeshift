import token from './src/resources/token.js'
import { REST } from "@discordjs/rest"
import { Routes } from 'discord-api-types/v9'
import { SlashCommandBuilder } from '@discordjs/builders'

const clientId = '303645054805737472'
const guildId = '272036959348588555'


// Register ping command
const command = new SlashCommandBuilder()
const commands = [command]
command
  .setName("ping")
  .setDescription("Check to see if Nova is alive")
  .setDefaultPermission(true)
  .addBooleanOption(option => {
    return option
      .setRequired(false)
      .setName("discrete")
      .setDescription("Whether or not to respond privately")
  })

console.log(commands)

// Publish
const rest = new REST({ version: '9' }).setToken(token)
;(async () => {
  console.log('Started refreshing application (/) commands.')

  await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commands },
  )
    .catch(console.error)

  console.log('Successfully reloaded application (/) commands.')
})()

import NovaCommand from "../utilities/NovaCommand.js"

import { inspect } from "util"
import { Formatters, Util } from "discord.js"
import { SlashCommandBuilder } from '@discordjs/builders'

async function handleInteraction(interaction) {
  let discrete, prompt
  try{
    prompt = interaction?.options?.getString("prompt", true)
    discrete = interaction.options.getBoolean("discrete", false) ?? true
  } catch {
    console.error("Something went wrong while parsing the command.")
  }
  await interaction.deferReply({ephemeral: discrete})

  if(interaction.user.id !== interaction.client.application.owner.id) { 
    return await interaction.editReply("Not authorized")
  }

  let response
  try {
    response = await eval(prompt)
  } catch (error) {
    response = error
  }
  response = inspect(response, { depth: 0 })
  const formattedResponse = Formatters.codeBlock("javascript", response)
  if(formattedResponse.length <= 2000) {
    response = formattedResponse
  } else {
    response = {
      files: [{
        attachment: response,
        name: 'evaluation.txt',
        description: 'The evaluated result of the prompt.'
      }]
    }
  }

  await interaction.editReply(response)
}

const command = new SlashCommandBuilder()
  .setName("eval")
  .setDescription("Check to see if Nova is alive")
  .setDefaultPermission(true)
  .addStringOption(option => {
    return option
      .setRequired(true)
      .setName("prompt")
      .setDescription("The code to evaluate")
  })
  .addBooleanOption(option => {
    return option
      .setRequired(false)
      .setName("discrete")
      .setDescription("Whether or not to respond privately")
  })

export default class extends NovaCommand {
  constructor() {
    super(command)
  }

  async handle(interaction) {
    handleInteraction(interaction)
  }
}

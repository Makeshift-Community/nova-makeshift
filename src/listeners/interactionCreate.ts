import commands from "../commands.ts";
import { Client, Events, type Interaction } from "discord.js";

export default function (client: Client) {
  client.on(Events.InteractionCreate, handle);
}

const handle = function (interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  for (const command of commands) {
    if (interaction.commandName === command.name) {
      command.handle(interaction).catch(console.error);
      break;
    }
  }
};

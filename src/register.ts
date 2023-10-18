import TOKEN from "../token.js";
import { REST, Routes } from "discord.js";
import config from "./resources/configLoader.js";
import commands from "./commands.js";
const { GUILD_ID, BOT_USERS } = config;
const { NOVA_ID } = BOT_USERS;

const builders = [];
for (const command of commands) {
  builders.push(command.builder.toJSON());
}

// Publish
const rest = new REST({ version: "10" }).setToken(TOKEN);

console.log("Started refreshing application (/) commands.");

await rest
  .put(Routes.applicationGuildCommands(NOVA_ID, GUILD_ID), { body: builders })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

console.log("Successfully reloaded application (/) commands.");

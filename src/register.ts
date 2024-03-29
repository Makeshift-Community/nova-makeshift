import TOKEN from "../token.js";
import { REST, Routes } from "discord.js";
import CONFIG from "./resources/configuration.js";
import commands from "./commands.js";
const { GUILD_ID, BOT_USERS } = CONFIG;
const { NOVA_USER_ID } = BOT_USERS;

const builders = [];
for (const command of commands) {
  builders.push(command.builder.toJSON());
}

// Publish
const rest = new REST({ version: "10" }).setToken(TOKEN);

let route;
if (process.env.NODE_ENV === "production") {
  route = Routes.applicationCommands(NOVA_USER_ID);
} else {
  console.log("Running in development mode");
  route = Routes.applicationGuildCommands(NOVA_USER_ID, GUILD_ID);
}

console.log("Started refreshing application (/) commands.");

// Clear old commands
if (process.env.NODE_ENV === "production") {
  await rest.put(route, { body: [] }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

// Set new commands
await rest.put(route, { body: builders }).catch((error) => {
  console.error(error);
  process.exit(1);
});

console.log("Successfully reloaded application (/) commands.");

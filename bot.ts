// External dependencies
import "dotenv/config";
import { Client, GatewayIntentBits, Partials } from "discord.js";

// Custom dependencies
import registerModules from "./src/listeners.ts";

// Display warning if we're in development mode
if (process.env.NODE_ENV !== "production") {
  console.log("Running in development mode");
}

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel, Partials.GuildMember],
});

registerModules(client);

function handleLoginError(error: Error) {
  console.error(error);
  process.exit(1);
}

// Start bot
await client.login(process.env.TOKEN).catch(handleLoginError);
console.log(`Logged in as ${client.user?.tag}`);

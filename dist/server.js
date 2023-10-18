// External dependencies
import { Client, GatewayIntentBits, Partials } from "discord.js";
// Custom dependencies
import token from "../token.js"; // I'm an idiot, thanks for the lesson
import registerModules from "./listeners.js";
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
    partials: [Partials.Channel, Partials.GuildMember],
});
registerModules(client);
function handleLoginError(error) {
    console.error(error);
    process.exit(1);
}
// Start bot
await client.login(token).catch(handleLoginError);
console.log(`Logged in as ${client.user?.tag}`);

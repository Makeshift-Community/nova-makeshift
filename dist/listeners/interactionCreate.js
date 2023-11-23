import { Events } from "discord.js";
import commands from "../commands.js";
export default function (client) {
    client.on(Events.InteractionCreate, handle);
}
const handle = function (interaction) {
    if (!interaction.isChatInputCommand())
        return;
    for (const command of commands) {
        if (interaction.commandName === command.name) {
            command.handle(interaction).catch(console.error);
            break;
        }
    }
};

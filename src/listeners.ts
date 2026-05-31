import handleMessages from "./listeners/messageCreate.ts";
import handleGuildMemberAdd from "./listeners/guildMemberAdd.ts";
import handleVoiceStateUpdate from "./listeners/voiceStateUpdate.ts";
import handleInteractionCreate from "./listeners/interactionCreate.ts";
import { Client } from "discord.js";

export default function (client: Client) {
  handleMessages(client);
  handleGuildMemberAdd(client);
  handleVoiceStateUpdate(client);
  handleInteractionCreate(client);
}

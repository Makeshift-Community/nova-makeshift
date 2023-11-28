import { Client, Events, VoiceState } from "discord.js";
import handleVoice from "../modules/assignEmptyVoiceChannel.js";

export default function (client: Client) {
  client.on(Events.VoiceStateUpdate, handle);
}

const handle = async function (oldState: VoiceState, newState: VoiceState) {
  await handleVoice(oldState, newState).catch(console.error);
};

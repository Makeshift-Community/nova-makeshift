import { Events } from "discord.js";
import handleVoice from "../modules/maintainEmptyVoiceChannel.js";
export default function (client) {
    client.on(Events.VoiceStateUpdate, handle);
}
const handle = async function (oldState, newState) {
    await handleVoice(oldState, newState).catch(console.error);
};

import handleSarcasm from "../modules/sarcasmDisclaimer.js";
import handle8ball from "../modules/8ball.js";
import handleSoon from "../modules/soon.js";
import handleLegacyVoice from "../modules/crossVoice.js";
import { Client, Events, Message } from "discord.js";

export default function (client: Client) {
  client.on(Events.MessageCreate, handle);
}

const handle = async function (message: Message) {
  await handleSarcasm(message).catch(console.error);
  await handle8ball(message).catch(console.error);
  await handleSoon(message).catch(console.error);
  handleLegacyVoice(message);
};

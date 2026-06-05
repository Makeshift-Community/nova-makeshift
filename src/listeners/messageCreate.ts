import handleSarcasm from "../modules/sarcasmDisclaimer.ts";
import handle8ball from "../modules/8ball.ts";
import handleSoon from "../modules/reactToMessagesEndingWithSoon.ts";
import { Client, Events, Message } from "discord.js";

export default function (client: Client) {
  client.on(Events.MessageCreate, handle);
}

const handle = async function (message: Message) {
  await handleSarcasm(message).catch(console.error);
  await handle8ball(message).catch(console.error);
  await handleSoon(message).catch(console.error);
};

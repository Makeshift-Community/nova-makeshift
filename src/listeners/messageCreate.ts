import handleSarcasm from "../modules/sarcasm.js";
import handle8ball from "../modules/8ball.js";
import handleSoon from "../modules/soon.js";
import { Client, Message } from "discord.js";

export default function (client: Client) {
  client.on("messageCreate", handle);
}

const handle = async function (message: Message) {
  await handleSarcasm(message);
  await handle8ball(message);
  await handleSoon(message);
};

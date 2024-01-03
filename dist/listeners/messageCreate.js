import handleSarcasm from "../modules/sarcasmDisclaimer.js";
import handle8ball from "../modules/8ball.js";
import handleSoon from "../modules/reactToMessagesEndingWithSoon.js";
import { logMessageActivity as handleActivityLogging } from "../modules/logActivity.js";
import { Events } from "discord.js";
export default function (client) {
    client.on(Events.MessageCreate, handle);
}
const handle = async function (message) {
    await handleSarcasm(message).catch(console.error);
    await handle8ball(message).catch(console.error);
    await handleSoon(message).catch(console.error);
    handleActivityLogging(message).catch(console.error);
};

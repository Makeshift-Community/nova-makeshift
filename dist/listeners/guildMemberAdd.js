import handleGreet from "../modules/greet.js";
import handleInitialColor from "../modules/assignColor.js";
import { Events } from "discord.js";
export default function (client) {
    client.on(Events.GuildMemberAdd, handle);
}
const handle = async function (member) {
    await handleGreet(member);
    await handleInitialColor(member);
};

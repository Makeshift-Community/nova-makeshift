import handleGreetOnJoin from "../modules/greetOnJoin.js";
import handleAssignColorOnJoin from "../modules/assignColorOnJoin.js";
import { Events } from "discord.js";
export default function (client) {
    client.on(Events.GuildMemberAdd, handle);
}
const handle = async function (member) {
    await handleGreetOnJoin(member).catch(console.error);
    await handleAssignColorOnJoin(member).catch(console.error);
};

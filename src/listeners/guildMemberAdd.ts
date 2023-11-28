import handleGreetOnJoin from "../modules/greetOnJoin.js";
import handleAssignColorOnJoin from "../modules/assignColorOnJoin.js";
import { Client, Events, GuildMember } from "discord.js";

export default function (client: Client) {
  client.on(Events.GuildMemberAdd, handle);
}

const handle = async function (member: GuildMember) {
  await handleGreetOnJoin(member).catch(console.error);
  await handleAssignColorOnJoin(member).catch(console.error);
};

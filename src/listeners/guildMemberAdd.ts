import handleGreet from "../modules/greet.js";
import handleInitialColor from "../modules/assignColor.js";
import { Client, Events, GuildMember } from "discord.js";

export default function (client: Client) {
  client.on(Events.GuildMemberAdd, handle);
}

const handle = async function (member: GuildMember) {
  await handleGreet(member).catch(console.error);
  await handleInitialColor(member).catch(console.error);
};

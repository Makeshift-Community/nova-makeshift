// Dependencies
import _ from "lodash";

import { ROLES, GUILD_ID } from "../resources/makeshift.js";
import { GuildMember } from "discord.js";

const COLOR_ROLES = ROLES.COLORS;

export default async function (member: GuildMember) {
  // Check if member joined Makeshift guild
  if (member.guild.id !== GUILD_ID) {
    return;
  }

  const userId = BigInt(member.user.id);
  const colorRoleCount = BigInt(_.size(COLOR_ROLES));
  const colorRoleIndex = Number(userId % colorRoleCount);

  const colorRole = _.values(COLOR_ROLES)[colorRoleIndex];
  await member.roles.add(colorRole).catch(console.error);
}

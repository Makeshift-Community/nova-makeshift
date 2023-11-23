// External dependencies
import _ from "lodash";
// Internal dependencies
import CONFIG from "../resources/configuration.js";
const { COLORED_ROLES, GUILD_ID } = CONFIG;
export default async function (member) {
    // Check if member joined Makeshift guild
    if (member.guild.id !== GUILD_ID) {
        return;
    }
    const userId = BigInt(member.user.id);
    const colorRoleCount = BigInt(_.size(COLORED_ROLES));
    const colorRoleIndex = Number(userId % colorRoleCount);
    const colorRole = _.values(COLORED_ROLES)[colorRoleIndex];
    await member.roles.add(colorRole).catch(console.error);
}

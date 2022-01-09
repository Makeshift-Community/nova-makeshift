// Dependencies
import _ from 'lodash'

import { COLORROLES as COLORS, GUILD as GUILD_ID } from '../resources/makeshift.js'

const { size } = _

export default async function (member) {
  // Check if member joined Makeshift guild
  if (member.guild.id !== GUILD_ID) { return }

  const userId = BigInt(guildMember.user.id)
  const colorId = userId % size(COLORS)
  const color = COLORS[colorId]
  guildMember.roles.add(color)
    .catch(console.error)
}

// Dependencies
import _ from 'lodash'

import { COLORROLES as COLORS, GUILD as GUILD_ID } from '../resources/makeshift.js'

const { values, size } = _

export default async function (member) {
  // Check if member joined Makeshift guild
  if (member.guild.id !== GUILD_ID) { return }

  const userId = BigInt(member.user.id)
  const colorCount = BigInt(size(COLORS))
  let colorId = userId % colorCount
  colorId = Number(colorId)
  const color = values(COLORS)[colorId]
  member.roles.add(color)
    .catch(console.error)
}

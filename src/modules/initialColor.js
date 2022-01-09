// Dependencies
import { size } from 'lodash'

const makeshift = require('../resources/makeshift.json')
const colors = makeshift.roles?.colors

export default async function (member) {
  // Check if member joined Makeshift guild
  if (member.guild.id !== makeshift.guild) return

  const color = colors[BigInt(guildMember.user.id) % size(colors)]

  guildMember.roles.add(color)
    .catch(console.error)
}

const Command = require('./../../utils/makeshiftCommand')
var colors = require('./../../resources/makeshift.json').roles.colors
var { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'colors',
      aliases: ['color', 'colours', 'colour'],
      group: 'other',
      description: 'Changes your color.',
      details: 'Change your color or list all available colors.',
      examples:
			['colors', 'color red']
    })
  }

  async run (message, args) {
    if (!this.guildCheck(message)) return
    const color = colors[args]
    if (!color) {
      message.channel.send(
        stripIndents`The following colors are available to be assigned:
				\`${Object.keys(colors).toString().replace(/,/g, '`, `')}\`
				
				*Use \`${message.client.commandPrefix}color name\` to assign yourself a color.*`
      )
        .catch(console.error)
      return
    } else {
      try {
        // Add new color
        if (!message.member.roles.has(color)) {
          await message.member.roles.add(color)
        }
        // Remove old colors
        // TODO: Lodash's _.get() or similar might be better here
        var rolesToRemove = message.member.roles
          .filter(role =>
            Object.values(colors).some(color =>
              color === role.id
            )
          )
        // Remove @everyone from the list of roles to remove
        rolesToRemove.sweep(role =>
          role == message.guild.defaultRole
        )
        // Remove freshly applied role from the list of roles to remove
        rolesToRemove.sweep(role =>
          role.id === color
        )
        message.member.roles.remove(rolesToRemove)
      } catch (error) {
        console.error(error)
      }
    }
    message.react('✅')
      .catch(console.error)
  }
}

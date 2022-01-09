const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'glyphs',
      aliases: ['glyph'],
      group: 'resources',
      description: 'List of all Warframe glyphs'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`Glyphdex:
			<https://glyphs.wf/>
			*A site listing all Warframe glyphs.
			Features a tracker and info on how to obtain most glyphs.*`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}

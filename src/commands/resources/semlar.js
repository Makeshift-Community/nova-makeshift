const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'semlar',
      aliases: ['rivencalc'],
      group: 'resources',
      description: 'Semlar, a website with Riven-, Amp- and Zaw-calculators'
    })
  }

  async run (msg) {
    try {
      await msg.channel.send(stripIndents`Semlar's website:
			<https://semlar.com/>
			*Mainly known for Zaw, Kitgun and Amp calculators as well as listing Riven dispositions and possible stats.*`)
      msg.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}

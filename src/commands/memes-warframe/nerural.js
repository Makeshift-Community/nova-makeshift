const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'nerural',
      aliases: ['sesar', 'sesars', 'neural', 'sensor', 'sensors'],
      group: 'memes-warframe',
      description: 'The best typo'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439508369875664926/nerural_sesars.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

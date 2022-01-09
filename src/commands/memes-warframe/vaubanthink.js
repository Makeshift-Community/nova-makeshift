const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'vaubanthink',
      aliases: ['think', 'thinking', 'vauban'],
      group: 'memes-warframe',
      description: 'Vauban thinking'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439509798342623232/vaubanthink.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}

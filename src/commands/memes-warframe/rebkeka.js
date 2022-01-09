const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'rebkeka',
      aliases: ['kek', 'rebecca', 'derebecca', '[de]rebecca'],
      group: 'memes-warframe',
      description: '[DE]Rebecca'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439508819794460672/rebkeka.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}

const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ok',
      aliases: ['okhand', 'ok_hand', 'novaok', 'nova_ok', 'okay'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439744218915799040/ok_hand.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

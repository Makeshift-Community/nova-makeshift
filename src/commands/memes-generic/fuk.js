const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'fuk',
      group: 'memes-generic',
      description: 'When trusting a fart goes wrong'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439493096548466698/fuk.png' } } }
    ]
    this.sendOne(message, options, args, 'Fuk')
  }
}

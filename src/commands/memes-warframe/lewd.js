const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'lewd',
      group: 'memes-warframe',
      description: 'LEWD'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439507410504384512/lewd.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}

const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'kela',
      aliases: ['keladethaym'],
      group: 'memes-warframe',
      description: 'Kela De Thaym'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439752799602081805/kela.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

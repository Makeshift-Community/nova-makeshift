const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'anasa',
      aliases: ['sortiereward'],
      group: 'memes-warframe',
      description: 'The reason we still play sorties for.'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439502791145422848/anasa.jpg' } } }
    ]
    this.sendOne(message, options, args, 'Anasa')
  }
}

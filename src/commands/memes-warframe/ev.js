const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ev',
      aliases: ['energyvampire', 'evpls', 'evamp', 'evampire'],
      group: 'memes-warframe',
      description: 'Energy Vampire'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439742996661927937/ev.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439752223929401344/ev2.png' } } }
    ]
    this.sendOne(message, options, args, 'Energy Vampire')
  }
}

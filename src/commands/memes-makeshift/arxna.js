const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'arxna',
      group: 'memes-makeshift',
      description: '-ARxNA-'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439495488128155658/arxna.jpg' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439931513534939151/arxna2.jpg' } } }
    ]
    this.sendOne(message, options, args, '-ARxNA-')
  }
}

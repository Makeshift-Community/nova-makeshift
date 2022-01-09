const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'mlotus',
      aliases: ['milotus', 'mylotus', "m'lotus"],
      group: 'memes-warframe',
      description: "M'Lotus \\*tips fedora\\*"
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439753121284096000/limbo2.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'galaxy',
      group: 'memes-makeshift',
      description: 'Galaxy'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439709445384044544/galaxy1.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439496112387391498/galaxy2.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439496195610640384/galaxy3.jpg' } } }
    ]
    this.sendOne(message, options, args, 'Galaxy')
  }
}

const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'zephyr',
      aliases: ['shit'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439510445645365278/zephyr1.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439510559013077002/zephyr2.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

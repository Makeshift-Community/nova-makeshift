const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'warbros',
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439509861567561728/warbros1.jpg' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439509915581808640/warbros2.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

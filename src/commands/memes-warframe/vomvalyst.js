const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'vomvalyst',
      aliases: ['vomvalysts', 'voms', 'vom', 'fuckingvomvalysts'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439745080342085633/fishing.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

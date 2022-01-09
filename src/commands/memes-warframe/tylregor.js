const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'tylregor',
      aliases: ['hammertime', 'itshammertime', "it'shammertime"],
      group: 'memes-warframe',
      description: "It's hammer time!"
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439933105252466708/tylregor.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

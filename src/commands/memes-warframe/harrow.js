const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'harrow',
      aliases: ['harrowchassis'],
      group: 'memes-warframe',
      description: 'Harrow chassis'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439506581357592576/harrow.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

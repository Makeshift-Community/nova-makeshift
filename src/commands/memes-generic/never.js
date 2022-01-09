const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'never',
      aliases: ['neverever'],
      group: 'memes-generic',
      description: 'The date Mag gets buffed'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439494447076474881/never.gif' } } }
    ]
    this.sendOne(message, options, args, 'Never')
  }
}

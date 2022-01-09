const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ok_boomer',
      aliases: ['okboomer', 'boomer'],
      group: 'memes-generic'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/569634781625712675/ok_boomer.jpg' } } }
    ]
    this.sendOne(message, options, args, 'okboomer')
  }
}

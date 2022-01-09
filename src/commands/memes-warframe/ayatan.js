const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ayatan',
      alias: ['sculpture', 'ayatansculputre'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439931595042979840/ayatan.png' } } }
    ]
    this.sendOne(message, options, args, 'Ayatan')
  }
}

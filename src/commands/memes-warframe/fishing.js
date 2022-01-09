const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'fishing',
      aliases: ['norg', 'murkray'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439746051810000896/norg.jpg' } } }
      // TODO: Image of REEEE Tenno do this shit
    ]
    this.sendOne(message, options, args, 'Fishing')
  }
}

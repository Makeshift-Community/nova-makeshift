const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ayatanstar',
      aliases: ['ayatanstars', 'amberstar', 'amber', 'ayatanamberstar', 'star'],
      group: 'memes-warframe',
      description: 'Ayatan amber star'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439753991476346880/ayatanstars.png' } } }
    ]
    this.sendOne(message, options, args, 'Ayatan amber star')
  }
}

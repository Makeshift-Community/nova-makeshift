const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'datamining',
      aliases: ['datamine', 'dataminer', 	'void_glitch', 'voidglitch'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439503532484329472/datamining1.jpg' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439503627330256926/datamining2.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439752967030046722/datamining3.jpg' } } }
    ]
    this.sendOne(message, options, args, 'Datamining')
  }
}

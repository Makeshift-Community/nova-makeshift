const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'barrier',
      aliases: ['laserbarrier'],
      group: 'memes-warframe',
      description: 'Laser barrier'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439754182673694720/laserbarrier.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}

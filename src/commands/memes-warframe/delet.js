const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'delet',
      aliases: ['delete', 'harrowdelet', 'harrowdelete'],
      group: 'memes-warframe',
      description: 'Delete this!'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439503723052662793/delet.jpg' } } }
      // {embed: {image: {url: "https://cdn.discordapp.com/attachments/437703489347649539/439510963331399680/delet.jpg"}}} //Kanna version
    ]
    this.sendOne(message, options, args, 'Delet')
  }
}

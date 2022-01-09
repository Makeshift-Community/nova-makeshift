const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'noanime',
      aliases: ['japan', 'animu', 'anime', 'weeaboos', 'weeaboo', 'weebs', 'otaku', 'otakus', 'weeb', 'no_anime'],
      group: 'memes-generic',
      description: 'Remember: no Anime.'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439494529863778304/noanime1.jpg' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439494615654072320/noanime2.jpg' } } }
    ]
    this.sendOne(message, options, args, 'No Anime')
  }
}

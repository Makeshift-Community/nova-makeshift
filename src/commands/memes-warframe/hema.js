const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'hema',
      aliases: ['mutagen', 'grinding', 'research'],
      group: 'memes-warframe',
      description: 'Hema research'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439506673221107727/hema.png' } } }
      // TODO: find caption of "it's raining mutagen in the derelict"
    ]
    this.sendOne(message, options, args)
  }
}

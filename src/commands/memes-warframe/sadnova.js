const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'sadnova',
      aliases: ['violin', 'sadviolin', 'sad', 'nova'],
      group: 'memes-warframe',
      description: 'Nova playing a violin'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { title: 'Artwork by u/ButItsOppositeDay', url: 'https://www.reddit.com/user/ButItsOppositeDay', image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439509183289884707/sadnova.gif' } } }
    ]
    this.sendOne(message, options, args)
  }
}

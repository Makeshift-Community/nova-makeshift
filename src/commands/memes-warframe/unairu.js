const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'unairu',
      aliases: ['unairulens', 'lens'],
      group: 'memes-warframe',
      description: 'Unairu lens'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439738266644774912/unairu.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

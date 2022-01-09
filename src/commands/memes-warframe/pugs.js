const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'pugs',
      aliases: ['pubs', 'puggies', 'pubbies'],
      group: 'memes-warframe',
      description: 'Other players'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439508727893065740/pugs1.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439508770595274759/pugs2.png' } } }
    ]
    this.sendOne(message, options, args)
  }
}

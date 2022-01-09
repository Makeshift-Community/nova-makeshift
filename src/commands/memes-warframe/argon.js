const Command = require('./../../utils/novaCommand')

module.exports = class f extends Command {
  constructor (client) {
    super(client, {
      name: 'argon',
      group: 'memes-warframe',
      description: 'My scopes argon 😉'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439743173657624576/argon2.png' } } }
    ]
    this.sendOne(message, options, args, 'Argon')
  }
}

const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'timetostop',
      aliases: ['frank', 'itstimetostop', 'filthyfrank'],
      group: 'memes-generic',
      description: "It's time to stop!"
    })
  }

  async run (message, args) {
    const options = [
      { content: 'https://youtu.be/2k0SmqbBIpQ' }
    ]
    this.sendOne(message, options, args, 'timetostop')
  }
}

const Command = require('./../../utils/novaCommand')
const makeshift = require('./../../resources/makeshift.json')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'music',
      name: 'play',
      guildOnly: true,
      hidden: true
    }
    super(client, options)
  }

  async run (message) {
    try {
      message.channel.send(`I can't play music yet, ${message.author}. How about asking ${message.client.users.get(makeshift.members.bots.octavia)} instead?`)
      message.react('❌')
    } catch (error) {
      console.error(error)
    }
  }
}

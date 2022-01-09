const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'developer',
      name: 'heartbeat',
      aliases: ['ping'],
      description: 'Checks which parts of Nova are running'
    }
    super(client, options)
  }

  async run (msg) {
    msg.react('💙')
      .catch(console.error)
  }
}

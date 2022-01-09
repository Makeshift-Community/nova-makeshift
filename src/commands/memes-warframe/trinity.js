const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'trinity',
      alias: ['trin', 'lobster'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439509659607367712/trinity.jpg' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439932332833636353/trinity2.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

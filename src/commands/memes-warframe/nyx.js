const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'nyx',
      aliases: ['kys', 'kyss', 'killyourself', 'killyourselves', 'nyxkys'],
      group: 'memes-warframe'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439752546761048070/nyx.jpg' } } }
    ]
    this.sendOne(message, options, args)
  }
}

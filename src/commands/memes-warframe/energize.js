const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'energize',
      group: 'memes-warframe',
      description: 'Arcane Energize'
    })
  }

  async run (message, args) {
    const options = [
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439506108252422145/energize1.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439506168834949120/energize2.png' } } },
      { embed: { image: { url: 'https://cdn.discordapp.com/attachments/437703489347649539/439932996410408960/energize3.png' } } }
    ]
    this.sendOne(message, options, args, 'Energize')
  }
}

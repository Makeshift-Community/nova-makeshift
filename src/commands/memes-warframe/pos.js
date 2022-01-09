const Command = require('./../../utils/novaCommand')
var { oneLine } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'pos',
      aliases: ['plains', 'poe'],
      group: 'memes-warframe',
      description: 'I love plains of Eidolon...'
    })
  }

  async run (message, args) {
    const options = [
      oneLine`I love plains of Eidolon,
			let's remove every mission in the game and put their rewards in the plains so we can play max range Nova every game.
			Killing enemies isn't even fun,
			Warframe was made to fish and mine and I can even use this fish oil to presumably power my level 25 Odonata.
			I can even do more incredibly interesting defence missions bounties for 5 Nistlepods and if I'm lucky, a host migration.
			Finally, once the sun goes down and I'm making my way to the final bounty I can take sweet comfort in the bounty failed text in the middle of my screen.`
    ]
    this.sendOne(message, options, args)
  }
}

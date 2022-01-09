const Command = require('./../../utils/makeshiftCommand')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'makeshift',
      name: 'namecheck',
      aliases: ['c', 'check', 'name'],
      description: 'Check your name according to *(old)* rule 6',
      guildOnly: true
    }
    super(client, options)
  }

  async run (message) {
    if (!this.guildCheck(message)) return
    // TODO: return wether or not name is valid (e.g. double brackets or illegal character)
    const displayName = message.member.displayName.split('(').pop().split(')').shift().replace(/[^A-Za-z0-9.\-_]/g, '')
    try {
      if (!displayName) {
        await message.channel.send(`Your name is **${displayName}**.`)
      } else {
        await message.channel.send('<@153595272465743872> `./src/commands/makeshift/namecheck.js` marker 1')
        // TODO: Proper error message (idk if this will fire at all or if it's just a fallback)
      }
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}

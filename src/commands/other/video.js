const Command = require('../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'other',
      name: 'video',
      aliases: ['webcam', 'voice'],
      description: 'Requests a video link for the current voice channel.'
    }
    super(client, options)
  }

  async run (message) {
    if (!message.guild) return
    try {
      if (message.member.voice.channel) {
        await message.channel.send(`<https://discordapp.com/channels/${message.guild.id}/${message.member.voice.channel.id}>`)
        message.react('✅')
      } else {
        await message.channel.send("You're not in a voice channel!")
        message.react('❌')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

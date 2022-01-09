const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'builder',
      aliases: ['builds', 'warframe-builder', 'wf-builder', 'distantobserver', 'distant-observer', 'observer', 'calculator', 'tennoware'],
      group: 'resources',
      description: 'Warframe builds'
    })
  }

  async run (message) {
    try {
      await message.channel.send({
        content: 'Warframe build resources',
        embed: {
          description: 'This is a collection of popular resources used for various Warframe builds.',
          fields: [
            {
              name: 'Tennoware',
              value: '\\> [Click here](https://tennoware.com/) < - A new and popular build website.'
            },
            {
              name: 'Warframe builder',
              value: '\\> [Click here](http://warframe-builder.com/) < - A website that used to be very popular in the past.'
            },
            {
              name: 'distant Observer',
              value: '\\> [Click here](https://www.youtube.com/channel/UC13043Ga8_N3kItV22oHazQ) < - A YouTube-channel centered around high-Forma builds and strong synergies.'
            },
            {
              name: 'Warframe Builds by Niche',
              value: '\\> [Click here](https://docs.google.com/document/d/1MQYrwZ3s3KMbU5aB6h_bxPjTouE9qDTAxMb86_P7JHw/) < - A collection of builds created by one player (\\-NICHE\\-) who is very dedicated to writing multiple, well-explained builds for all moddable gear. This is a very long document that is an ongoing work-in-progress.'
            },
            {
              name: 'WFCD builds channel',
              value: stripIndents`\\> [Click here](https://discordapp.com/channels/77176186148499456/150312340590428160) < - The builds channel on the Warframe community Discord. Very active and has many people willing to help with your build.
							\\> use \`${message.guild.commandPrefix}wfcd\` for more info < - The WFCD has a channel and many experienced players dedicated to helping out with your builds. Feel free to ask for help.`
            },
            {
              name: 'Warframe Teaching Archives',
              value: `\\> use \`${message.guild.commandPrefix}archives\` for more info < - A Discord server with curated Warframe builds. This is where the fancy images come from.`
            }
          ]
        }
      })
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}

const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'market',
      aliases: [
        'warframe.market', 'warframemarket', 'wf.market', 'nexus', 'nexusstats', 'price', 'prices', 'rivens', 'warframetrader',
        'wftrader.com', 'rivenmods', 'warframe.trader', 'rivens.market', 'trade', 'trades', 'trading'
      ],
      group: 'resources',
      description: 'Links related to trading in Warframe'
    })
  }

  async run (message) {
    try {
      await message.channel.send({
        content: 'Links related to trading in Warframe:',
        embed: {
          fields: [
            {
              name: 'Warframe market',
              value: stripIndents`\\> [Click here](http://warframe.market/) < - The biggest and most popular trading site. Offers all tradable items and Rivens (currently beta).`
              // \\> [Click here](https://discordapp.com/invite/M7BHnPS) < Their Discord server. Can also be used for trading but is not as intuitive.
            },
            {
              name: 'Riven market',
              value: '\\> [Click here](https://riven.market/) < - Currently the biggest Riven trading site.'
            },
            {
              name: 'Warframe Community Discord',
              value: `\\> use \`${message.client.commandPrefix}wfcd\` for more info < - The WFCD offers many channels for trading and pricechecking.`
            },
            {
              name: 'WarframeTrade (formerly Black Market)',
              value: `\\> use \`${message.client.commandPrefix}wartrade\` for more info < - This used to be the main Discord server for trading.`
            },
            {
              name: "Folren's Riven Epicness Server",
              value: `\\> use \`${message.client.commandPrefix}folren\` for more info < - A server dedicated to Riven mods (best for checking Riven prices). Can also be used for selling.`
            },
            {
              name: 'NexusStats',
              value: '\\> [Click here](https://nexus-stats.com/) < - A website that parses in-game trade chat messages (WTB/WTS) and compiles statistics.'
            },
            {
              name: 'Semlar',
              value: '\\> [Click here](https://semlar.com/rivenprices/) < - Riven prices parsed from trade-chat. Up-to-date Riven price averages.'
            },
            {
              name: 'Official weekly Riven prices',
              value: stripIndents`\\> [Click here](http://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensPC.json) < - Official list of Riven trades that actually happened. Data is in JSON format, so it might be hard to read.
							\\> [Click here](https://forums.warframe.com/topic/1077490-riven-trading-toolbuilders-phase-1/) < - Forum post with explanation of all terms used in the list.`
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

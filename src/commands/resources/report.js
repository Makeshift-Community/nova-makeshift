const Command = require('../../utils/novaCommand')
const { stripIndents } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'report',
      group: 'resources',
      description: 'How to report inadequate player bevaior to Digital Extremes'
    })
  }

  async run (message) {
    await message.channel.send({
      content:
			stripIndents`First of all: if you still have the opportunity to collect evidence (like screenshots) __do it right now__!

			Reporting a player for bad behavior (in the game) shouldn't be done for fun.
			Make sure that the player has broken either the Terms of Use or the End User License Agreement listed here:
			<https://www.warframe.com/terms> and <https://www.warframe.com/eula>
			This usually involves things such as:
			:white_small_square: Leeching public missions for prolonged time (thus circumventing the AFK-detection)
			:white_small_square: Inadequate chat behavior (including insults, spam and bullying)
			:white_small_square: Heavy bug abuse, hacking or cheating (very rarely happens)
			:white_small_square: Offensive usernames
			
			In order to report a Warframe player for bad behavior (to Digital extremes) go to their official site
			<https://www.warframe.com/>.
			Hover your mouse over \`COMMUNITY\` in the top ribbon and click on \`SUPPORT\` in the list when it pops up.
			After logging in you will be redirected to Zendesk, the customer support platform Warframe uses.
			To create a new ticket, click on \`Submit a request\` in the top right corner.
			On the next page, click on \`Report User or Hack\` and provide as much detail as possible.`
    })
    message.react('✅')
  }
}

const Command = require('./../../utils/novaCommand')
const { stripIndents } = require('common-tags')
const wikiSearch = require('./../../utils/searchWiki')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'wiki',
      aliases: ['warframewiki', 'wfwiki', 'wikia', 'wikilink', 'fandom'],
      group: 'resources',
      description: 'Link to the Warframe wiki'
    })
  }

  async run (message) {
    try {
      await message.channel.send(stripIndents`The Warframe wiki:
			<http://warframe.wikia.com/wiki/WARFRAME_Wiki>
			*Pretty much all information is available here.*`)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }

    // Prompt entered. Doing search.
    wikiSearch(args)
      .then(async function (result) {
        const embed = {
          embed: {
            title: Object.values(result.items)[0].title,
            url: result.basepath + Object.values(result.items)[0].url,
            description: Object.values(result.items)[0].abstract,
            image: {
              url: Object.values(result.items)[0].thumbnail
            }
          }
        }
        try {
          await message.channel.send(embed)
          message.react('✅')
        } catch (error) {
          console.error(error)
        }
      })
      .catch(async function (error) {
        console.error(error)
        try {
          await message.channel.send('Failed to retrieve search result. The wiki might be offline.')
          message.react('❌')
        } catch (error) {
          console.error(error)
        }
      })
  }
}

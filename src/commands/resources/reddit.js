const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'reddit',
      aliases: ['subreddit', 'r/warframe', 'r/wf', 'subreddits', 'reddits'],
      group: 'resources',
      description: 'Warframe subreddits'
    })
  }

  async run (message) {
    try {
      await message.channel.send({
        content: 'Warframe subreddits:',
        embed: {
          fields: [
            {
              name: 'r/Warframe',
              value: '\\> [Click here](https://www.reddit.com/r/Warframe/) < - The big subreddit for almost everything.'
            },
            {
              name: 'r/MemeFrame',
              value: '\\> [Click here](https://www.reddit.com/r/MemeFrame/) < - A subreddit dedicated to Warframe memes.'
            },
            {
              name: 'r/WarframeRunway',
              value: '\\> [Click here](https://www.reddit.com/r/WarframeRunway/) < - Fashionframe.'
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

const path = require('path')

/**
 * Handles registration and loading of Novas commands.
 * @param {Object} client The CommandoClient to register the commands in.
 */
module.exports = function (client) {
  client.registry
    .registerGroups([
      ['developer', 'Developer'],
      ['makeshift', 'Makeshift'],
      ['resources', 'Resources'],
      ['memes-warframe', 'Memes (Warframe)'],
      ['memes-makeshift', 'Memes (Makeshift)'],
      ['memes-generic', 'Memes (general)'],
      ['other', 'Other'],
      ['music', 'Music']
    ])
    .registerDefaultGroups()
    .registerDefaultTypes()
    .registerCommandsIn(path.join(__dirname))
    .registerDefaultCommands(
      {
        help: true,
        prefix: false,
        eval_: true,
        ping: false,
        commandState: false,
        unknownCommand: false
      }
    )
  console.log('Nova commands loaded.')
}

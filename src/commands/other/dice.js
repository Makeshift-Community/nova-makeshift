const Command = require('./../../utils/novaCommand')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'dice',
      aliases: ['r', 'roll', 'dice', 'die'],
      group: 'other',
      memberName: 'dice',
      description: 'Rolls one or more dice.',
      details: 'First number is the amount of dice, second number is the amount of sides.',
      examples: ['roll', 'roll 3d20']
    })
  }

  async run (message, args) {
    args = args.split('d')
    if ((!isNaN(args[0])) && (!isNaN(args[1]))) {
      if ((args[0] > 0) && (args[1] > 0) && (args[0] <= 100) && (args[1] <= 1000)) {
        var out = ''
        var result = 0
        for (var i = 0; i < args[0]; i++) {
          var singleRoll = Math.floor((Math.random() * args[1]) + 1)
          result += singleRoll
          out += singleRoll + ' '
        }

        return message.channel.send(
					`🎲 Rolled ${args[0].trim()} times with a ${args[1].trim()}-sided die: **${result}**
					\`\`\`${out}\`\`\``
        )
      }
    }
    try {
      if (!args) {
        await message.channel.send(Math.floor((Math.random() * 6) + 1))
      } else {
        await message.channel.send('TODO: actually implement command.')
      }
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}

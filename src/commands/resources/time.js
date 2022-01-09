const Command = require('./../../utils/novaCommand')
const { DateTime, Interval } = require('luxon')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      group: 'resources',
      name: 'time',
      aliases: ['utc', 'reset'],
      description: 'Shows Warframe server time and time left until Warframe daily reset.'
    })
  }

  async run (message) {
    try {
      await message.channel.send(createEmbed()) // TIME_24_SIMPLE
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}

function createEmbed () {
  // Figure out the right times
  const time_now = DateTime.utc()
  const time_reset = time_now.endOf('day')
  let time_digitalExtremes = DateTime.utc().setZone('America/Toronto')
  // Checks if sorties have already been updated today (12am in London, Ontario) and sets the desired day to tommorow.
  if (time_digitalExtremes.hour >= 12) {
    time_digitalExtremes = time_digitalExtremes.plus({ days: 1 })
  }
  // Set to sortie refresh time.
  time_digitalExtremes = time_digitalExtremes.set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
  // Intervals
  const interval_reset = Interval.fromDateTimes(time_now, time_reset)
  const interval_sorties = Interval.fromDateTimes(time_now, time_digitalExtremes)
  return {
    content: `Current time: **${time_now.toFormat("h':'mm")}** *(UTC+0)*.`,
    embed: {
      fields: [
        {
          name: 'New sorties in',
          value: interval_sorties.toDuration().toFormat("h':'mm")
        },
        {
          name: 'Daily reset in',
          value: interval_reset.toDuration().toFormat("h':'mm")
        }
      ]
    }
  }
}

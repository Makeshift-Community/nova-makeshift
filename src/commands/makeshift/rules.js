const Command = require('./../../utils/makeshiftCommand')
const { oneLine, stripIndents } = require('common-tags')
var prefix

module.exports = class extends Command {
  constructor (client) {
    const options = {
      group: 'makeshift',
      name: 'rules',
      aliases: ['rule'],
      description: 'Lists all or just a specific rule of the Makeshift clan',
      argsType: 'multiple'
    }
    super(client, options)
    prefix = client.commandPrefix
  }

  async run (message, args) {
    if (!this.guildCheck(message)) return
    try {
      var rule = rules
      args.forEach(element => {
        if (rule.children.hasOwnProperty(element)) {
          rule = rule.children[element]
        } else {
          rule.label = 'What kind of rule is that supposed to be?'
        }
      })
      await message.channel.send(rule.label)
      message.react('✅')
    } catch (error) {
      console.error(error)
    }
  }
}

const rules = {
  label: stripIndents`**__Makeshift rules:__**:

	\`1.\` Use common sense
	\`2.\` Politics, NSFW, religion etc. are allowed
	\`3.\` We will give you at least one warning
	\`4.\` Include your in-game name
	\`5.\` Up to 14 days of unannounced inactivity are okay
	\`6.\` Leaving the Discord means leaving the community

	*A more elaborate explanation of each rule can be acquired by issuing the command with the number of the rule (e.g. \`${prefix}rule 1\`).*`,
  children: {
    1: {
      label: '__**Rule 1: Use common sense**__\n' +
			'This is by far the most important of our rules. Please don’t try to stir up unnecessary drama.'
    },
    2: {
      label: '__**Rule 2: Politics, NSFW, religion etc. are allowed**__\n' +
			oneLine`Unlike many other Discords, content involving politics, NSFW, religion and similar are
			permitted and may be discussed as long as it’s not deliberate spread of propaganda.`
    },
    3: {
      label: '__**We will give you at least one warning**__\n' +
			oneLine`This is not a rule as much as it is a promise. Everyone should have a chance to better
			themselves. As a result, everyone will get at least one warning before a ban gets issued. Our
			warnings will be as indicative as possible and contain proper feedback. A warning results in
			immediate suspension to access of all things Makeshift until it has been acknowledged. A ban
			results in a complete exclusion from all things Makeshift. Extreme cases may be treated
			differently.`
    },
    4: {
      label: '__**Include your in-game name**__\n' +
			oneLine`Members should be easy to identify and mentionable on Discord. Therefore please make sure
			to include either your in-game name or the name you’re most commonly referred to in your
			Discord nickname. This part should only consist of letters available on a regular English
			keyboard. You can still decorate your name with emojis or similar, as long as it’s kept to a
			non-obtrusive format.`
    },
    5: {
      label: stripIndents`__**Up to 14 days of unannounced inactivity are okay**__
			More than 14 days of inactivity might result in a kick, but we will guarantee you can keep your spot during that time. There are a couple exceptions to this:
			:white_small_square: We know that long periods of content-deprivation (e.g. no updates for more than a month) tend to happen with Warframe and will usually take that into account.
			:white_small_square: Let the moderators know if you’d like to be absent for a longer period of time.
			:white_small_square: We consider 60 days to be our hard limit. Reaching this limit will almost surely result in a kick.
			:white_small_square: We might kick players below 14 days of inactivity if we suspect they’re just logging in for the sake of reserving their own spot without actually playing.
			:white_small_square: At any given time we might be condoning activity checks on our Discord server. We expect a fitting response to these.`
    },
    6: {
      label: '__**Rule 6: Leaving the Discord means leaving the community**__\n' +
			oneLine`Discord is our foundation and main means of communication. We consider leaving our
			Discord server a reason to believe that you’re no longer interested in us as a community and
			will thus exclude you from all things Makeshift. You can still stick around if you’ve left the
			clan, but you might get kicked if we have a good reason to believe you’re not interested in
			our community anymore.`
    },
    34: {
      label: '😏'
    },
    old: {
      label: stripIndents`**General rules**:
			\`1.\` Use common sense
			\`2.\` Feel free to ask
			\`3.\` One warning
			
			**Clan (ingame) rules**:
			\`4.\` 14 days
			
			**Discord rules**:
			\`5.\` Use the right channels
			\`6.\` Include your ign
			\`7.\` You may stay
			
			*A more elaborate explanation of the rules can be acquired by issuing the \`${prefix}rules\` command with the number of the rule (e.g. \`${prefix}rule 1\`).*`,
      children: {
        1: {
          label: '__**Rule 1: Use common sense** *(general rule)*__\n' +
					oneLine`This is the most important rule of all.
					We believe that you should use common sense and not be too obnoxious.`
        },
        2: {
          label: '__**Rule 2: Feel free to ask** *(general rule)*__\n' +
					oneLine`Need help with some hard mission or just need a buddy for survival and chill?
					We highly encourage you to ask!`
        },
        3: {
          label: '__**Rule 3: One warning** *(general rule)*__\n' +
					oneLine`Every player should have a chance to better themselves.
					You will get at least one warning.
					Anything beyond that is up to us.`
        },
        4: {
          label: '__**Rule 4: 14 days** *(clan/ingame)*__\n' +
					oneLine`*More than 14 days of inactivity will get you expelled from the clan.
					Send one of the mods a DM if you can't play for prolonged periods.`
        },
        5: {
          label: '__**Rule 5: Use the right channels** *(Discord rule)*__\n' +
					'Different channels are there for a reason :wink:.'
        },
        6: {
          label: '__**Rule 6: Include your IGN** *(Discord rule)*__\n' +
					'Include your in-game name so other players can identify you as easily as you want to identify them.'
        },
        7: {
          label: '__**Rule 7: You may stay** *(Discord rule)*__\n' +
					oneLine`Non-clan members will get kicked from the Discord if we think they've lost touch with the community,
					but you're welcome to stay on this Discord if you wish to do so.`
        }
      }
    }
  }
}

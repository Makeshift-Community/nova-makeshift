const Command = require('./../../utils/novaCommand')
var { oneLine } = require('common-tags')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'posvet',
      aliases: ['poevet', 'posv'],
      group: 'memes-warframe',
      memberName: 'posvet',
      description: "I'm a PoE Veteran."
    })
  }

  async run (message, args) {
    const options = [
      oneLine`I'm a PoE Veteran.
			If you're not familiar with the term, that stands for Plains of Eidolon.
			I do endgame level missions as an MR 25 Tenno in order to stand out from my lesser peers.
			Eidolon hunts are very difficult, involving a lot more work outside the game than LoR or JV.
			Only very intelligent players are able to thrive in PoE hunts, and I've done several PoE hunts.
			In fact, I have captured Hydrolysts on many different hunts.
			Capturing a Hydrolyst on a hunt involves a technical interview that tests your knowledge of lures and limb phenomena in order to prove you deserve to be there.
			I have passed many Eidolon nights and obtained triple caps in almost all of them.
			PoE hunts are very hard but I am very good at them.
			You have to be very smart in order to do a PoE hunt successfully.
			I've gotten quite a few captures.
			Doing PoE hunts is a great way to get ahead in Warframe,
			and it can help with being considered an endgame veteran because you can prove to other players that you're smart enough to be taking Plains of Eidolon hunts,
			abbreviated as PoE hunts.`,
      oneLine`As a member of the Eidolon community and a part of one of these organizations this is highly offensive.
			Eidolon hunters in Warframe make it their goal to give players a place to feel comfortable as well as better the community.
			Comparing specific equipment checks to a convoluted raid full of bugs is absurd and beyond inaccurate.
			Making the claim that Eidolon hunts are meta-cliques is demeaning the Tennnohood and values they are founded on.
			This clearly is a stab at a community in Warframe that does nothing but support the rest of the player base.`
    ]
    this.sendOne(message, options, args)
  }
}

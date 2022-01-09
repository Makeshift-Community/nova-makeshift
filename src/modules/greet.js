export default async function(member){
	//Check if member joined Makeshift guild
	if(member.guild.id !== makeshift.guild) return

	const channel = await member.guild.channels.fetch()
		.catch(console.error)
	if(channel === undefined) { return }

	channel.send(`Welcome to the Makeshift clan Discord, ${member}!`)
		.catch(console.error)
}

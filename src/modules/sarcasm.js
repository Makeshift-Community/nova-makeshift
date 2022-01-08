const trigger = /(?:^\/s$)|(?:\s\/s$)/g

export default async function(message){
  // Check
  if(trigger.test(message.content) === false) { return }

  message.channel.send("*(That was sarcasm)*")
    .catch(console.error)
}

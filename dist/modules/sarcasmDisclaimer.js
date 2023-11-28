const trigger = /(?:^|\s)\/s$/;
export default async function (message) {
    // Check
    if (message.guild === null) {
        return;
    }
    const hasTrigger = trigger.test(message.content);
    if (!hasTrigger)
        return;
    await message.channel.send("*(That was sarcasm)*").catch(console.error);
}

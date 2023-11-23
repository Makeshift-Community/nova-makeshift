import { inspect } from "util";
import { AttachmentBuilder, SlashCommandBooleanOption, SlashCommandStringOption, codeBlock, } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
const name = "eval";
async function handle(interaction) {
    const prompt = interaction.options.getString("prompt", true);
    const discrete = interaction.options.getBoolean("discrete", false) ?? true;
    // Defer
    await interaction.deferReply({ ephemeral: discrete });
    // Check permissions
    const application = await interaction.client.application.fetch();
    const owner = application.owner;
    if (owner === null) {
        console.error("Eval: Owner is null.");
        await interaction.editReply("Owner is null");
        return;
    }
    if (interaction.user.id !== owner.id) {
        console.error("Eval: Not authorized.");
        await interaction.editReply("Not authorized");
        return;
    }
    // Evaluate
    let rawResponse;
    try {
        rawResponse = await eval(prompt);
    }
    catch (error) {
        rawResponse = error;
    }
    // Format response
    const responseString = inspect(rawResponse, { depth: 0 });
    const formattedResponse = codeBlock("javascript", responseString);
    if (formattedResponse.length <= 2000) {
        // Send as regular message
        await interaction.editReply(formattedResponse);
    }
    else {
        // Send as file
        const file = new AttachmentBuilder(Buffer.from(responseString))
            .setName("eval.txt")
            .setDescription("The evaluated result of the prompt.");
        const payload = {
            files: [file],
        };
        await interaction.editReply(payload);
    }
}
const promptOption = new SlashCommandStringOption()
    .setRequired(true)
    .setName("prompt")
    .setDescription("The code to evaluate");
const discreteOption = new SlashCommandBooleanOption()
    .setRequired(false)
    .setName("discrete")
    .setDescription("Whether or not to respond privately");
const builder = new SlashCommandBuilder()
    .setName(name)
    .setDescription("Evaluate an expression for debugging purposes")
    .addStringOption(promptOption)
    .addBooleanOption(discreteOption);
export default {
    name,
    builder: builder,
    handle,
};

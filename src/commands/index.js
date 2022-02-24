import evaluate from "./eval.js"

let test = {
	eval_command: new evaluate
}

export default function(interaction) {
	if(interaction.isCommand() === false) { return }
	const handler = getHandler(interaction.commandName)
	handler.handle(interaction)

}

function getHandler(commandName) {
	switch(commandName) {
		case "eval":
			return test.eval_command
		default:
			console.error(`Command not recognized: ${commandName}`)
	}
}

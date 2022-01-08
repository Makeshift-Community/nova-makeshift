module.exports = function (client) {
	require("./greet")(client)
	require("./sassynova")(client)
	require("./sarcasm")(client)
	require("./soontm")(client)
	require("./voicemagic")(client)
	require("./prism2")(client)
	console.log("Nova modules loaded.")
}

module.exports = function (client) {
	require("./greet")(client)
	require("./voicemagic")(client)
	require("./prism2")(client)
	console.log("Nova modules loaded.")
}

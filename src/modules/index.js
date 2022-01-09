module.exports = function (client) {
	require("./voicemagic")(client)
	require("./prism2")(client)
	console.log("Nova modules loaded.")
}

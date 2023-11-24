var rp = require("request-promise-native")

module.exports = function(prompt){
	var options = {
		uri: "https://warframe.fandom.com/api/v1/Search/List",
		qs: {
			query: prompt,
			limit: 1,
			minArticleQuality: 10,
			batch: 1,
			namespaces: "0"
		},
		headers: {
			"User-Agent": "Request-Promise"
		},
		json: true
	}

	return rp(options)
}

import handleSarcasm from '../modules/sarcasm.js'

export default function (client) {
  client.on("message", handle)
}

const handle = function (message) {
  handleSarcasm(message)
}

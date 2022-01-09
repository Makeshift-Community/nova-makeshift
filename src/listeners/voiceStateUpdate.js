import handleVoice from '../modules/voicemagic.js'

export default function(client) {
  client.on("voiceStateUpdate", handle)
}

const handle = async function(oldState, newState) {

}
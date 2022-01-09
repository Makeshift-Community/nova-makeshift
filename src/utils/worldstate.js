const worldstateUrl = 'http://content.warframe.com/dynamic/worldState.php'
const rp = require('request-promise-native')

module.exports = function () {
  return new Promise((resolve, reject) => {
    rp(worldstateUrl)
      .then(body => {
        console.log('WORLDSTATE REQUESTED 01')
        resolve(JSON.parse(body))
      })
      .catch(error => {
        console.error(error)
        reject('NK: Could not acquire new worldState')
      })
  })
}

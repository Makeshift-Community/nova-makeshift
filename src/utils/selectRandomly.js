var { sample } = require('lodash')

/**
 * Returns a single item from an array. If an invalid index is specified, a random item gets called instead.
 * @param {Object[]} options An array of options of which one will be returned.
 * @param {Number} choice The index of the array to return from.
 * @return {Object} The object returned from the specified options.
 */
function selectOne (options, choice) {
  const option = options[choice - 1]
  return option || sample(options)
}

/**
 * Like random, but attaches the selected choice as the message content.
 * @param {Object[]} options An array of options of which one will be returned.
 * @param {Number} choice The index of the array to return from.
 * @param {string} name The name.
 * @return {Object} The object returned from the specified options.
 */
function constructOne (options, choice = undefined, name = 'Choice') {
  var option = selectOne(options, choice)
  option = selectOne(options, choice)
  var index = options.indexOf(option)
  const header = `${name} ${index + 1}/${options.length}`
  if (!option.content) {
    option.content = header
  } else if (options.length > 1) {
    option.content = `*${header}:*\n${option.content}`
  }
  return option
}

module.exports = constructOne

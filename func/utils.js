const fullDeck = require('../data/fullDeck')

function arrayFromText(text) {
  return text.split(',').map((item) => {
    return item.trim()
  })
}

function textFromArray(array) {
  return array.join(', ')
}

function checkScore(array) {
  let sum = 0
  for (i = 0; i < array.length; i++) {
    let cardInfo = fullDeck.find(card => card.card === array[i])
    sum = sum + cardInfo.value
  }
  return sum
}

module.exports = {
  arrayFromText,
  textFromArray,
  checkScore
}

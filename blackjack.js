const fullDeck = require('./data/fullDeck')
const utils = require('./func/utils')
const deck = require('./func/deck')

let playerDeck = []
let cardsSam = []
let cardsDealer = []
let winner = 'dealer'
let drawIndex = 4

async function blackjack () {
  await initGame()
  await startHands()
  await playGame()
  await printResults()
}

blackjack()

/* Main functions */
async function initGame () {
  if (process.argv[2] && (process.argv[2].includes('/') || process.argv[2].includes('\\'))) {
    console.log('dette', process.argv[2])
    playerDeck = await deck.deckFromFile(process.argv[2])
  } else {
    playerDeck = await deck.shuffleDeck(fullDeck)
  }
}

async function startHands () {
  await cardsSam.push(playerDeck[0])
  await cardsDealer.push(playerDeck[1])
  await cardsSam.push(playerDeck[2])
  await cardsDealer.push(playerDeck[3])
}

async function playGame () {
  if (await checkStartHand()) {
    return
  }
  await playSam()
  await playDealer()
  await checkEndHands()
}

async function printResults () {
  await console.log(winner)
  await console.log('sam: ', utils.textFromArray(cardsSam))
  await console.log('dealer: ', utils.textFromArray(cardsDealer))
}

/* Used by playGame */
async function checkStartHand () {
  let scoreSam = utils.checkScore(cardsSam)
  let scoreDealer = utils.checkScore(cardsDealer)
  if (scoreSam === 21 && scoreDealer === 21) {
    winner = 'sam'
    return true
  } else if (scoreSam === 22 && scoreDealer === 22) {
    winner = 'dealer'
    return true
  } else {
    return false
  }
}

async function playSam () {
  let scoreSam = utils.checkScore(cardsSam)
  while (scoreSam < 17) {
    cardsSam.push(playerDeck[drawIndex])
    scoreSam = utils.checkScore(cardsSam)
    drawIndex++
  }
}

async function playDealer () {
  let scoreDealer = utils.checkScore(cardsDealer)
  let scoreSam = utils.checkScore(cardsSam)
  if (scoreSam === 21) {
    return
  }
  while (scoreDealer <= scoreSam) {
    cardsDealer.push(playerDeck[drawIndex])
    scoreDealer = utils.checkScore(cardsDealer)
    drawIndex++
  }
}

async function checkEndHands () {
  let scoreDealer = utils.checkScore(cardsDealer)
  let scoreSam = utils.checkScore(cardsSam)
  if (scoreSam > 21) {
    winner = 'dealer'
  } else if (scoreDealer > 21) {
    winner = 'sam'
  } else if (scoreSam > scoreDealer) {
    winner = 'sam'
  } else {
    winner = 'dealer'
  }
}

module.exports = blackjack

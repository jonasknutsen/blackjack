const fs = require('fs')
const fullDeck = require('./deck')

let playerDeck = []
let cardsSam = []
let cardsDealer = []
let winner = 'dealer'
let drawIndex = 4

async function blackjack() {
  await initGame()
  await startHands()
  await playGame()
  await printResults()
}

blackjack()

/* Main functions */
async function initGame() {
  if (process.argv[2]) {
    playerDeck = await deckFromFile(process.argv[2])
  } else {
    playerDeck = await shuffleDeck(fullDeck)
  }
  return
}

async function startHands() {
  await cardsSam.push(playerDeck[0])
  await cardsDealer.push(playerDeck[1])
  await cardsSam.push(playerDeck[2])
  await cardsDealer.push(playerDeck[3])
}

async function playGame() {
  if (await checkStartHand()) {
    return
  }
  await playSam()
  await playDealer()
  await checkEndHands()
}

async function printResults() {
  await console.log(winner)
  await console.log('sam: ', textFromArray(cardsSam))
  await console.log('dealer: ', textFromArray(cardsDealer))
}

/* Used by initGame() */
async function deckFromFile(file) {
  let content = fs.readFileSync(file, 'utf8')
  return arrayFromText(content)
}

async function shuffleDeck(fullDeck) {
  // Based on the Durstenfeld shuffle
  // https://stackoverflow.com/a/12646864
  let simpleDeck = await justTheCardsPlease(fullDeck)
  for (let i = simpleDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [simpleDeck[i], simpleDeck[j]] = [simpleDeck[j], simpleDeck[i]];
  }
  return simpleDeck
}

async function justTheCardsPlease(deck) {
  let cards = deck.map((d) => {
    return d.card
  })
  return cards
}

/* Used by playGame */
async function checkStartHand() {
  let scoreSam = checkScore(cardsSam)
  let scoreDealer = checkScore(cardsDealer)
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

async function playSam() {
  let scoreSam = checkScore(cardsSam)
  while (scoreSam < 17) {
    cardsSam.push(playerDeck[drawIndex])
    scoreSam = checkScore(cardsSam)
    drawIndex++
  }
  return
}

async function playDealer() {
  let scoreDealer = checkScore(cardsDealer)
  let scoreSam = checkScore(cardsSam)
  if (scoreSam === 21) {
    return
  }
  while (scoreDealer <= scoreSam) {
    cardsDealer.push(playerDeck[drawIndex])
    scoreDealer = checkScore(cardsDealer)
    drawIndex++
  }
}

async function checkEndHands() {
  let scoreDealer = checkScore(cardsDealer)
  let scoreSam = checkScore(cardsSam)
  if (scoreSam > 21) {
    winner = 'dealer'
    return
  } else if (scoreDealer > 21) {
    winner = 'sam'
    return
  } else if (scoreSam > scoreDealer) {
    winner = 'sam'
    return
  } else {
    winner = 'dealer'
    return
  }
}

/* Utils */
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

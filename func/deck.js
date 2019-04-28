const fs = require('fs')
const utils = require('./utils')

async function deckFromFile (file) {
  let content = fs.readFileSync(file, 'utf8')
  return utils.arrayFromText(content)
}

async function shuffleDeck (fullDeck) {
  // Based on the Durstenfeld shuffle
  // https://stackoverflow.com/a/12646864
  let simpleDeck = await justTheCardsPlease(fullDeck)
  for (let i = simpleDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [simpleDeck[i], simpleDeck[j]] = [simpleDeck[j], simpleDeck[i]];
  }
  return simpleDeck
}

async function justTheCardsPlease (deck) {
  let cards = deck.map((d) => {
    return d.card
  })
  return cards
}

module.exports = {
  deckFromFile,
  shuffleDeck
}

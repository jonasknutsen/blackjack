const chai = require('chai')
const expect = chai.expect
const deck = require('../../func/deck')
const fullDeck = require('../../data/fullDeck')

describe('func/deck.js', function () {
  it('deckFromFile() - should return an array if valid input file', async function () {
    let returnValue = await deck.deckFromFile('/Users/jonas/code/blackjack/testdecks/deck1.txt')
    expect(returnValue)
      .to.be.a('array')
  })

  it('shuffleDeck() - should return an shuffled array with text values', async function () {
    let returnValue = await deck.shuffleDeck(fullDeck)
    expect(returnValue)
      .to.be.an('array')
      .that.have.length(52)
      .and.to.include('C2')
      .and.to.include('SA')
      .and.does.not.eql(fullDeck)
  })
})

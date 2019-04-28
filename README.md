# blackjack
Simple game of blackjack between Sam and the Dealer in Node.js/JavaScript.

## Installation and use
Requires node to be installed.

Run with `node blackjack.js`. Or from npm with `npm run start`.

### Input
To run the program with a predefined deck, the location of a deck file must be entered as a argument when starting the app, eg. `node blackjack.js /Users/jonas/code/blackjack/testdecks/deck1.txt`

The decks must be in the following format: `CA, D4, H7, SJ,..., S5, S9, D10`. 

Some testdecks are included in the testdecks folder.

If no input is specified, a random deck is created.

### About scoring
Numbered cards are their point value. Jack, Queen and King count as 10 and Ace counts as 11.

## Testing
Mocha and Chai are used for testing. 

To install, run `npm install`.

To run the tests, run `npm run test`.

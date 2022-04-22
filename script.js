class Board {
  constructor(numPlayers) {
    let hands
    for (let i = 0; i < numPlayers; i++) {
      hands.push(Hand())
    }
    this.newGame()
  }

  newGame = function() {
    this.deck = this.getNewDeck()
    this.newRound()
  }

  getNewDeck = function() {
    const deckMakerUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    const drawCardUrl = 'https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=52'
    fetch(deckMakerUrl)
      .then(response => response.json())
      .then(deck =>{
        fetch(drawCardUrl.replace('<<deck_id>>', deck.deck_id))
          .then(response => response.json())
          .then(cards => this.deck = cards)
      })
  }

  newRound = function() {
    hands.array.forEach(hand => {
      hand.emptyHand()
    });
  }
}

class Hand {
  constructor() {
    this.emptyHand()
  }

  emptyHand = function() {
    this.contents = []
  }

  draw = function(deck) {
    return deck[Math.cieling(deck.length * Math.random())]
  }
}

class BlackJackBoard extends Board {
  constructor() {
    super(2)
    this.dealerHand = this.hands[0]
    this.palyerHand = this.hands[1]
  }
}

blackJackBoard = new BlackJackBoard()
// let deck
// let playerHand
// let dealerHand

// reset()

// function reset() {
//   playerHand = []
//   dealerHand = []
//   generateDeck()
// }

// function fetchFromUrl(url) {
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => data)
// }

// function generateDeck() {
//   const deckGeneratorUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=3'
//   fetchFromUrl(deckGeneratorUrl).then(data => deck = data)
// }

// function draw(deck) {
//   const drawCardUrl = 'https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1'
//   return fetchFromUrl(drawCardUrl.replace('<<deck_id>>', deck.deck_id))
// }

// function getCardValue(card) {
//   if (card.value.length == 4) {
//     return 10
//   } else if (card.value == 'ACE') {
//     return 11
//   } else {
//     return +card.value
//   }
// }

// function getHandValue(hand) {
//   return hand.map(card => getCardValue(card)).reduce((lhs, rhs) => lhs + rhs, 0)
// }

// document
//   .getElementById('hit')
//   .addEventListener('click', () => draw(deck).then(response => playerHand.push(response.cards[0])))
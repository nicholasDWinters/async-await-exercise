// get one card and log the value and suit

axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(res => {
        for (card of res.data.cards) {
            console.log(card.value, 'of', card.suit)
        }
    })
    .catch(err => console.log(err))


// get two cards and log the value and suit once you have both

let twoCards = [];

axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(res => {
        for (card of res.data.cards) {
            twoCards.push(card)
        }
        return axios.get(`https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
    })
    .then(res => {
        for (card of res.data.cards) {
            twoCards.push(card)
        }
        for (c of twoCards) {
            console.log(`${c.value} of ${c.suit}`)
        }
    })
    .catch(err => console.log(err))


let cardCount = 52
// draw from deck everytime button is pushed

axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        console.log(res)
        $('#drawCard').on('click', function () {
            axios.get(`https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
                .then(res => {
                    console.log(res)
                    $('#cardImg').attr('src', `${res.data.cards[0].image}`);
                    cardCount -= 1;
                    $('#numCards').text(`${cardCount}`);
                    if (cardCount === 0) {
                        $('#drawCard').remove();
                    }
                })
                .catch(err => console.log(err))
        })
    })
    .catch(err => console.log(err))

// get one card and log the value and suit

async function getCard() {
    try {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        for (let card of res.data.cards) {
            console.log(card.value, 'of', card.suit);
        }
    } catch (e) {
        console.log(e);
    }
}
getCard();


// get two cards and log the value and suit once you have both

async function getTwoCards() {
    let cards = [];
    try {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        let res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`);
        cards.push(res.data.cards[0])
        cards.push(res2.data.cards[0])
        for (card of cards) {
            console.log(card.value, 'of', card.suit);
        }
    } catch (e) {
        console.log(e);
    }

}

getTwoCards();


// draw from deck everytime button is pushed

let cardCount = 52

async function drawFromDeck() {
    try {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        $('#drawCard').on('click', async function () {
            let newRes = await axios.get(`https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`);
            $('#cardImg').attr('src', `${newRes.data.cards[0].image}`);
            cardCount -= 1;
            $('#numCards').text(`${cardCount}`);
            if (cardCount === 0) {
                $('#drawCard').remove();
            }
        })
    } catch (e) {
        console.log(e);
    }
}

drawFromDeck();
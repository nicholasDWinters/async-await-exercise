// NUMBER FACTS SECTION

// FAVORITE NUMBER

async function getNum(num) {
    try {
        let res = await axios.get(`http://numbersapi.com/${num}?json`);
        console.log(res.data);
    } catch (e) {
        console.log(e);
    }
}
// MULTIPLE NUMBERS, AND ADD TO PAGE

async function getMultNums(arr) {
    let toString = arr.join();
    try {
        let res = await axios.get(`http://numbersapi.com/${toString}?json`);
        for (let fact of Object.values(res.data)) {
            $('#numFacts').append(`<p>${fact}</p>`)
        }
    } catch (e) {
        console.log(e);
    }
}

let arr = [12, 16, 24, 32];
getMultNums(arr);

// MULTIPLE REQUESTS FOR FAVORITE NUMBER FACTS

async function getFourFavFacts() {
    try {
        let facts = await Promise.all([
            axios.get(`http://numbersapi.com/29?json`),
            axios.get(`http://numbersapi.com/29?json`),
            axios.get(`http://numbersapi.com/29?json`),
            axios.get(`http://numbersapi.com/29?json`)
        ])

        facts.forEach(fact => $('#favFacts').append(`<p>${fact.data.text}</p>`));
    } catch (e) {
        console.log(e);
    }
}

getFourFavFacts();

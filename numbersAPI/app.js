// NUMBER FACTS SECTION

// FAVORITE NUMBER

axios.get('http://numbersapi.com/27?json')
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })


// MULTIPLE NUMBERS, AND ADD TO PAGE


axios.get('http://numbersapi.com/1,2,3,4?json')
    .then(res => {
        for (fact of Object.values(res.data)) {

            $('#numFacts').append(`<p>${fact}</p>`)
        }
    })
    .catch(err => {
        console.log(err)
    })

// MULTIPLE REQUESTS FOR FAVORITE NUMBER FACTS

let fourPromises = [];
for (let i = 1; i < 5; i++) {
    fourPromises.push(
        axios.get(`http://numbersapi.com/27?json`)
    );
}
Promise.all(fourPromises)
    .then(item => {
        item.forEach(p => $('#favFacts').append(`<p>${p.data.text}</p>`))
    })
    .catch(err => console.log(err));

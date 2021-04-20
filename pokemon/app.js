async function getThreePokemon() {
    threePokemon = []
    let res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118');
    let rand1 = Math.floor(Math.random() * 1118);
    let rand2 = Math.floor(Math.random() * 1118);
    let rand3 = Math.floor(Math.random() * 1118);
    threePokemon.push(res.data.results[rand1]);
    threePokemon.push(res.data.results[rand2]);
    threePokemon.push(res.data.results[rand3]);
    logPokeData(threePokemon);
}

async function logPokeData(arr) {
    let data = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${arr[0].name}/`),
        axios.get(`https://pokeapi.co/api/v2/pokemon/${arr[1].name}/`),
        axios.get(`https://pokeapi.co/api/v2/pokemon/${arr[2].name}/`)
    ])
    pokeData = []
    for (let pokemon of data) {

        const { name } = pokemon.data;
        let poke = {
            name: name,
            species: pokemon.data.species.url,
            descriptions: []
        }
        let data = await axios.get(`${poke.species}`)
        for (let entry of data.data.flavor_text_entries) {
            if (entry.language.name === 'en') {
                poke.descriptions.push(entry.flavor_text);
            }
        }
        pokeData.push(poke);
    }
    for (let poke of pokeData) {
        console.log(poke.name, '-', poke.descriptions[0])
    }
}

getThreePokemon();


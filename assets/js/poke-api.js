//criado um objeto
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    //convertendo lista
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    //primeira item da lista
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//fetch - Conforme vc executar a busca, se der tudo certo uma hora vc recebe essa busca
//procedimento assincrono
//interface de uma promisse, try catch (ele chamao then, se der erro busca o catch)
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

//funcao com dois parametros e montado a url da pokeapi
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //fetch devolveu uma promisse de response
    return fetch(url)
        //convertendo em json
        .then((response) => response.json())
        //dentro do json pega a lista de pokemons
        .then((jsonBody) => jsonBody.results)
        //uma nova lista de pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //lista de requisições esperando as promisse all que é uma lista de promessas dos detalhes do pokemon e quando elas terminarem tras o resultado
        .then((detailRequests) => Promise.all(detailRequests))
        //
        .then((pokemonsDetails) => pokemonsDetails)
}
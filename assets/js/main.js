const pokemonList = document.getElementById('pokemonList')
const carregarMaisButton = document.getElementById('loadMoreButton')

const maxRecords = 151 //qtd pokemons da 1 geração
const limit = 10
let offset = 0;

//retornando a lista do html
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

//map - como se fosse um for transfor mando uma lista nova
//join - junta todos os elementos da lista (passando uma string vazia)
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        ////inner - concatena como += para não substituir a pagina
        pokemonList.innerHTML += newHtml
    })
}

//pesquisando a primeira vez, a lista
loadPokemonItens(offset, limit)

//quando clicar no botão incrementa o offset
carregarMaisButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    //se a qtd de records for mais que record, 
    //eu calculo um novo limite e pesquiso com novo limite
    // e removo botao
    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        //removendo o botao
        carregarMaisButton.parentElement.removeChild(carregarMaisButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
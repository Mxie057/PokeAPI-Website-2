const mainContainer = document.getElementById('mainContainer');
const amountToDisplay = 898;
const maxPokemonId = 898;
const colors = {
    fire: '#EE8130',
    grass: '#7AC74C',
    electric: '#F7D02C',
    water: '#6390F0',
    ground: '#E2BF65',
    rock: '#B6A136',
    fairy: '#D685AD',
    poison: '#A33EA1',
    bug: '#A6B91A',
    dragon: '#6F35FC',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C22E28',
    normal: '#A8A77A',
    dark:'#705746',
    ice:'#96D9D6',
    ghost:'#735797',
    steel:'#B7B7CE',
    default: '#ffffff',
}

const legendaryIds= [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 
    377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 
    484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 638, 639, 640, 
    641, 642, 643, 644, 645, 646, 647, 648, 649, 716, 717, 718, 772, 773, 
    785, 786, 787, 788, 789, 790, 791, 792, 800, 888, 889, 890, 891, 892,
    894, 895, 896, 897, 898];

const main_types = Object.keys(colors);

const fetchPokemon = async () => {
    for(let i=1; i<=amountToDisplay; i++){
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add('pokemon');

    let poke_types = pokemon.types.map(el => el.type.name[0].toUpperCase() + el.type.name.slice(1));
    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    let imgContainer = legendaryIds.includes(pokemon.id) ? "legendaryImgContainer" : "imgContainer";
    let infoContainer = legendaryIds.includes(pokemon.id) ? "legendaryInfo" : "info";
    let pokemonColour = colors[pokemon.types[0].type.name] || colors["default"];

    const pokeInnerHTML = `
        <div class ="${imgContainer}" style="background: ${pokemonColour}"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png"></div>
        <div class="${infoContainer}">
            <span class="number">Pokedex ID: ${pokemon.id}</span>
            <h5 class="name">${name}</h3>
            <small class="type">Type: <span>${poke_types.join("/")}</span></small>
        </div>`;

    pokemonEl.innerHTML = pokeInnerHTML;

    mainContainer.appendChild(pokemonEl);
}

fetchPokemon();

// Add if image not found condition
// Change Types to return pokemon styles type block
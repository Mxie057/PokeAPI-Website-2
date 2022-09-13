const mainContainer = document.getElementById('mainContainer');
const amountToDisplay = 6;
const maxPokemonId = 905;
const colors = {
    fire: '#FDFFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3ED',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#98D7A5',
    bug: '#F8D5A3',
    dragon: '#97B3E6',
    psychic: '#EAEDA1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    dark:'#ffffff',
    ice:'#ffffff',
    default: '#ffffff'
}

const legendaryIds= [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 
    377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 
    484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 638, 639, 640, 
    641, 642, 643, 644, 645, 646, 647, 648, 649,];

const main_types = Object.keys(colors);

const fetchPokemon = async () => {
    for(let i=1; i<=amountToDisplay; i++){
        let pokemonID = getRandomPokemonID();
        await getPokemon(pokemonID);
    }
}

function getRandomPokemonID(){
    return Math.floor(Math.random() * maxPokemonId);
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
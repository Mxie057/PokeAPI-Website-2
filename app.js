console.log("Hello World");

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText
}

let apiURL = "https://pokeapi.co/api/v2/pokemon/bulbasaur"

let jsonResponse = httpGet(apiURL);
let json2 = JSON.parse(jsonResponse);

console.log(json2.name);
document.write(json2.name, json2.weight, json2.abilities[0].ability.name);
document.querySelector(".card-text-1").innerText = capitalizeFirstLetter(json2.name);

let imgSrc = document.querySelector(".card-img-1");
imgSrc.setAttribute("src",getPokemonPhoto(json2));

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function getPokemonPhoto(json2){
    return json2.sprites.front_default;
}
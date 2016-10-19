const {hide, seek} = require('./modules/hidenseek');
const random = require('./modules/random');
const {Pokemon, PokemonList} = require('./modules/pokemonList');
const pokemonsData = require('./data/pokemons');

PokemonList.prototype.addAll = function(json) {
  for (prop in json) {
    this.add(prop, json[prop]);
  };
};

let pokemons = new PokemonList;
pokemons.addAll(pokemonsData);
console.dir(pokemons);
hide('field/1/2/3', 'some data');
seek();

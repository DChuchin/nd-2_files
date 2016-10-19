const FileSystem = require('fs');
const random = require('./random');

function createFolders(path='./field', count = 10) {
  return new Promise((resolve,rejet)=> {
    for (let i = 1; i <= count; i++) {
      const FileName = path + '/' + twoDigit(i);
      FileSystem.mkdir(FileName);
      resolve(path);
    };
  });
};

function mkDirP(path) {
    let folders = path.split('/');
    return new Promise((resolve, reject) => {
        let res = folders.reduce((path,folder)=> {
            if (path == "." || path == "..") {
              return path + '/' + folder;
            };
            FileSystem.mkdirSync(path, (err)=> reject(err));
            return path + '/' + folder;
        });
        resolve(res);
    });
};

function makeDir(path) {
    return new Promise((resolve,reject) => {
        FileSystem.mkdir(path, (err) => {
            if (err) {
                reject(err);
            }
        });
        resolve(path);
    });
};

function twoDigit(num) {
    return (num < 10 ? '0' + num : num)
};

function getRandomPokemon(list) {
    let pokemonCount = list.length;
    let randomNum = random(0, pokemonCount - 1);
    let pokemon = list[randomNum];
    return {
        info:`${pokemon.name}|${pokemon.level}`,
        pokemon: pokemon
    }
};

function hidePokemon(pokemon, path) {
    return new Promise((resolve,reject) => {
        FileSystem.appendFile(path + '/pokemon.txt', pokemon, (err) => {
            if (err) {
                reject(err);
            }
        });
    });
};

module.exports = {
    hide: function(path, pokemonList) {
        let hiddenPokemons = [];
        mkDirP(path)
            .then(makeDir(path))
            .then(createFolders(path, 10))
            .then((path)=> {
                let countRandomPokemons = pokemonList.length < 3 ? random(1 , pokemonList.length) : random(1,3);
                for (let i = 0 ; i<countRandomPokemons; i++) {
                    let {info, pokemon}  = getRandomPokemon(pokemonList);
                    while (hiddenPokemons.indexOf(pokemon) != -1) {
                      let randomPokemon = getRandomPokemon(pokemonList);
                      info = randomPokemon.info;
                      pokemon = randomPokemon.pokemon;
                    };
                    let randomFolder = twoDigit(random(1,10));
                    hiddenPokemons.push(pokemon);
                    hidePokemon(info, path + '/' + randomFolder);
                  ;
                };
                console.log('------Hidden Pokemons:');
                hiddenPokemons.forEach(item => item.show());
            })
            .catch(err => console.log(err));
  },
  seek: function () {
    console.log('seek');
  }
};

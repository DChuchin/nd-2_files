const FileSystem = require('fs');

function createFolders(path='./field', count = 10) {
  return new Promise((resolve,rejet)=> {
    for (let i = 1; i <= count; i++) {
      const FileName = path + '/' + (i < 10 ? '0' + i : i);
      FileSystem.mkdir(FileName);
      resolve();
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


module.exports = {
  hide: function(path, pokemonList) {
    mkDirP(path).then(makeDir(path)).then(createFolders(path, 10))
  },
  seek: function () {
    console.log('seek');
  }
};

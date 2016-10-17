const FileSystem = require('fs');

function createFolders(count = 10, path='./field') {
  return new Promise((resolve,rejet)=> {
    makeDir(path);
    for (let i = 1; i <= count; i++) {
      const FileName = path + '/' + (i < 10 ? '0' + i : i);
      FileSystem.mkdir(FileName);
      resolve();
    };
  });
};

function makeDir(path) {
  let folders = path.split('/');
  FileSystem.mkdirSync(folders.reduce((path,folder) => {
    if (path == "." || path == "..") {
      return path + '/' + folder;
    };
    FileSystem.mkdirSync(path);
    return path + '/' + folder;
  }));
};

// function removeDir(path) {
//   let folders = path.split('/');
//   let count = folders.length;
//   for (let i=0; i<count; i++) {
//     if (!(folders == '.')){
//       FileSystem.rmdirSync(folders.join('/'));
//     };
//     folders.pop();
//   };
// };


module.exports = {
  hide: function(path, pokemonList) {
    createFolders(10,path).then(
      FileSystem.appendFile(path, pokemonList);
    );
  },
  seek: function () {
    console.log('seek');
  }
};

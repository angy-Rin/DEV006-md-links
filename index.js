const {
  resolverDirectorio,
  leerArchivos,
  validateTrue,
} = require("./utils.js");

module.exports = function mdLinks(path, options = {}) {
  return new Promise((resolve, reject) => {
    resolverDirectorio(path)
      .then((data) => leerArchivos(data))
      .then((result) => {
        if (options.validate === true) {
          validateTrue(result).then((object) => {
            resolve(object);
          });
        } else {
          resolve(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

#!/usr / bin / env node
const {resolverDirectorio, leerArchivos, validateTrue} = require('./utils.js');
const fs = require("fs");
const path = require("path");


module.exports = function mdLinks(path, options = {}) {
  // La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos
  return new Promise((resolve, reject) => {
    resolverDirectorio(path)
      .then((data) => leerArchivos(data))
      .then((result) => {
        if (options.validate === true || argument === "--validate") {
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

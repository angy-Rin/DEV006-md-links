#!/usr/bin/env node
// arriba ruta donde esta instalado npm de forma global
const mdLinks = require("./index.js");
const chalk = require("chalk");
const argumento1 = process.argv[3];
const argumento2 = process.argv[4];
const path2 = process.argv[2];
let options = {
  validate: false,
};

if (argumento1 === "--validate" || argumento2 === "--validate") {
  options.validate = true;
}

mdLinks(path2, options)
  .then((links) => {
    if (links.length === 0) {
      console.log(
        chalk.bgBlack.hex("#4dcdff")("No se encontró ninguna URL 🔍!")
      );
    }
    const uniqueValueCount = countUniqueUrl(links, "href");
    if (argumento1 !== "--stats") {
      links.map((object) => {
        console.log(
          `${object.href} ${chalk.bgBlack.hex("#4dcdff")(
            object.ok || ""
          )} ${chalk.bgBlack.hex("#ab4dff")(object.status || "")} | ${
            object.text
          }`
        );
      });
    } else if (argumento1 == "--stats" && argumento2 == "--validate") {
      const numberCount = countNumberOccurrences(
        links.map((obj) => obj.status), 404 );
      console.log(`Total: ${links.length}`);
      console.log(`Unique: ${uniqueValueCount}`);
      console.log(`Broken: ${numberCount}`);
    } else {
      console.log(`Total: ${links.length}`);
      console.log(`Unique: ${uniqueValueCount}`);
    }
  })
  .catch((err) => {
    console.log(err);
  });
//Set es un objeto integrado (built-in) que permite almacenar colecciones de valores únicos,
//lo que significa que no permite elementos duplicados.
function countUniqueUrl(array, key) {
  const uniqueUrl = new Set();
  array.map((obj) => uniqueUrl.add(obj[key]));
  //add y size es un método
  return uniqueUrl.size;
}
//el 0 es para inicializar el count
function countNumberOccurrences(array, status404) {
  const numberCount = array.reduce((count, obj) => {
    if (obj === status404) {
      count++;
    }
    return count;
  }, 0);

  return numberCount;
}

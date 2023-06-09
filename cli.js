#!/usr/bin/env node
//ruta donde esta instalado npm de forma global
const mdLinks = require("./index.js");
const chalk = require("chalk")
const argumento1 = process.argv[3];
const argumento2 = process.argv[4];
const path2 = process.argv[2];
let options={
  validate:false
};

if(argumento1 === "--validate"){
  options.validate=true;
}

mdLinks(path2, options)
  .then((links) => {
    if(links.length ===0) {
    console.log("No se encontraron links!")
    };
  //   if (argumento1 == "--validate") {
    links.map((object) => {
        console.log(
          `${(object.href)} ${chalk.bgBlack.hex("#4dcdff")(object.ok || "")} ${chalk.bgBlack.hex("#ab4dff")(object.status || "")} | ${object.text}`
          );
    });
  // } else if (argumento1 === undefined) {
  //   links.map((object) => {
      
  //       console.log(
  //         `${(object.href)} ${chalk.bgBlack.hex("#4dcdff")(object.ok)} ${chalk.bgBlack.hex("#ab4dff")(object.status)} | ${object.text}`
  //       );
  //   });
  // }
  //   const uniqueValueCount = countUniqueUrl(links, "href");
  //   if (argumento1 == "--stats" && argumento2 !== "--validate") {
  //     console.log(`Total: ${links.length}`);
  //     console.log(`Unique: ${uniqueValueCount}`);
  //   }
  //   if (argumento1 == "--stats" && argumento2 == "--validate") {
  //     const numberCount = countNumberOccurrences(
  //       links.map((obj) => obj.status),
  //       404
  //     );
  //     console.log(`Total: ${links.length}`);
  //     console.log(`Unique: ${uniqueValueCount}`);
  //     console.log(`Broken: ${numberCount}`); // 2
  //   }
  //   if(argumento1 !== "--validate" && argumento1 !== "--stats" && argumento1 !== undefined) {
  //     console.log(`El comando ${argumento1} no es valido.`)
  //   }
  })
  .catch((err) => {
    console.log(err);
  });
//Set es un objeto integrado (built-in) que permite almacenar colecciones de valores únicos, 
//lo que significa que no permite elementos duplicados.
function countUniqueUrl(array, key) {
  const uniqueUrl = new Set();
  array.map((obj) => uniqueUrl.add(obj[key]));
  return uniqueUrl.size;
}
//el 0 es para inicializar el count
function countNumberOccurrences(array, number) {
    const numberCount = array.reduce((count, obj) => {
      if (obj === number) {
        count++;
      }
      return count;
    }, 0);
  
    return numberCount;
  }
  

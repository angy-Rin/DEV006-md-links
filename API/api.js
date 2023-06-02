const fs = require("fs");
const path = require("path");
// const input = path.join(__dirname, "file.md");
const input = __dirname;
const regExp = /\]\((https?:\/\/[^\s]+)\)/g;
const regExpText = /\[(.*?)\]\(/g;
// const input_path = path.join(__dirname, input)

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let array = [];
function principalFunction(input) {

  return new Promise(function (resolve, reject) {
    if (!path.isAbsolute(input)) {
      input = path.join(__dirname, input);
    }
    if (!fs.existsSync(input)) {
      reject("Directorio/archivo no encontrado");
    }
    if (fs.statSync(input).isDirectory()) {
      fs.readdirSync(input).forEach((file) => {
        let fullPath = path.join(input, file);
        if (fs.statSync(fullPath).isDirectory()) {
          principalFunction(fullPath);
        } else if (path.extname(file) === ".md") {
          array.push(fullPath);
          resolve(array);
        }
      });
    } else {
      if (path.extname(input) === ".md") {
        array.push(input);
        resolve(array);
      }
    }
  });
}

function leersincrono(file) {
  return new Promise(function(resolve, reject){
    const linkRegex = /\[([^\]]+)\]\((?!#)([^\)]+)\)/g; //regular expression first matches [text] & then (text) except if it starts with #
    const links = [];
    let match;
    file.map((element, index, longitud) => {
      fs.readFile(element, (err, data) => {
        while ((match = linkRegex.exec(data)) !== null) {
          const linkText = match[1];
          const linkUrl = match[2];
          links.push({ href: linkUrl, text: linkText, file: element  });
        }
       if(index === longitud.length-1){
        resolve(links);
       } 
      })
    })
  })
 
}


const https = require("https");

function getRequest(link) {
  return new Promise((resolve, reject) => {
    https
      .get(link.href, (res) => {
        const { statusCode } = res;

        if (statusCode === 200) {
          link.ok = "ok";
        } else {
          link.ok = "fail";
        }
        link.status = statusCode;
        resolve(link);
        
      })
      .on("error", (err) => {
        link.ok = "fail";
        link.status = null;
        resolve(link);
      });
  });
}

function status(array_links) {
  return new Promise((resolve, reject) => {
    const array_request = [];

    const promises = array_links.map((link) => {
      return getRequest(link);
    });

    Promise.all(promises)
      .then((results) => {
        array_request.push(...results);
        resolve(array_request);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = function mdLinks(path, options = {}) {
  // La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos
  return new Promise((resolve, reject) => {
    principalFunction(path)
      .then((data) => leersincrono(data))
      .then((result) => {
        if (options.validate === true) {
          status(result).then((object) => {
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

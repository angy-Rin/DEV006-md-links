const fs = require("fs");
const path = require("path");

function resolverDirectorio(input) {
  return new Promise(function (resolve, reject) {
    if (typeof input !== "string") {
      reject("El path debe ser un string");
    }
    if (!path.isAbsolute(input)) {
      input = path.resolve(input);
    }
    if (!fs.existsSync(input)) {
      reject(`${input} Directory/file not found`);
    }
    let array = []; 
    if (fs.statSync(input).isDirectory()) {
      const recursivity = readDirectory(input);

      function readDirectory(directory) {
        const files = fs.readdirSync(directory);
        const results = [];
      
        files.forEach((file) => {
          const fullPath = path.join(directory, file);
          if (fs.statSync(fullPath).isDirectory()) {
            const subdirectoryFiles = readDirectory(fullPath);
            results.push(...subdirectoryFiles);
          } else if (path.extname(file) === '.md') {
            results.push(fullPath);
          }
        });
      
        return results;
      }

      resolve(recursivity); // Resolver la promesa una vez que se haya terminado de leer el directorio
    } else if (path.extname(input) === ".md") {
      array.push(input);
      resolve(array);
    } else {
      reject(`${input} is not a MARKDOWN`);
    }
  });
}

function leerArchivos(file) {
  return new Promise(function (resolve, reject) {
    const linkRegex = /\[([^\]]+)\]\(((?!#)(https[^\)]+))\)/g;
    const links = [];
    let match;
    file.map((element, index, longitud) => {
      fs.readFile(element, (err, data) => {
        while ((match = linkRegex.exec(data)) !== null) {
          const linkText = match[1];
          const linkUrl = match[2];
          links.push({ href: linkUrl, text: linkText, file: element });
        }
        if (index === longitud.length - 1) {
          resolve(links);
        }
      });
    });
  });
}

const https = require("https");
// https.requestTimeout = 5000;

function getRequest(link) {
  return new Promise((resolve, reject) => {
    try {
      https
        .get(link.href, (res) => {
          const { statusCode } = res;

          if (statusCode >= 200 && statusCode <= 399) {
            link.ok = "ok";
          } else {
            link.ok = "fail";
          }
          link.status = statusCode;
          resolve(link);
          res.on("end", () => {
            resolve(link);
          });
        })
        .on("error", (err) => {
          link.ok = "fail";
          link.status = "error";
          resolve(link);
        });
    } catch (error) {
      link.ok = "fail";
      link.status = "error";
      resolve(link);
    }
  });
}

function validateTrue(array_links) {
  return new Promise((resolve, reject) => {
    // no es conveniente utilizar una constante para almacenar datos asincronos
    //const array_request = [];

    const promises = array_links.map((link) => {
      return getRequest(link);
    });

    Promise.all(promises)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  resolverDirectorio,
  leerArchivos,
  getRequest,
  validateTrue,
};

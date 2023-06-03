const fs = require("fs");
const path = require("path");
let array = [];

function resolverDirectorio(input) {

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
            resolverDirectorio(fullPath);
          } else if (path.extname(file) === ".md") {
            array.push(fullPath);
            resolve(array);
          }
        });
      } else if (path.extname(input) === ".md") {
          array.push(input);
          resolve(array);
      } else {
        reject(`${input} no es un MARKDOWN`)
      }
    });
  }

  function leerArchivos(file) {
    return new Promise(function (resolve, reject) {
      const linkRegex = /\[([^\]]+)\]\((?!#)([^\)]+)\)/g;
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
        link.push({ ok: "fail", status: null });
        resolve(link);
      });
  });
}

function validateTrue(array_links) {
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

module.exports = {
    resolverDirectorio,
    leerArchivos,
    getRequest,
    validateTrue
}
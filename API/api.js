const fs = require("fs");
const path = require("path");
// const input = path.join(__dirname, "file.md");
const input = __dirname;
const regExp = /\]\((https?:\/\/[^\s]+)\)/g;
const regExpText = /\[(.*?)\]\(/g;
// const input_path = path.join(__dirname, input)

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function principalFunction(input) {
  let array = [];
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
  const arrays = [];
  const array_text = [];
  const array_object = [];
  return new Promise(function (resolve, reject) {
    file.forEach((element, index, longitud) => {
      fs.readFile(element, (err, data) => {
        const url_ = data.toString().match(regExp) || "";
        const text_ = data.toString().match(regExpText) || "";
        arrays.push(...url_);
        array_text.push(...text_)
        // request.href = (arrays);
        if (index === longitud.length - 1) {
          arrays.forEach((eachurl) => {
            while (/[^\w\s]$/.test(eachurl)) {
              const string = eachurl.replace(/[^\w\s]$/, "");
              eachurl = string;
            }
            while (/^[\W_]+/.test(eachurl)) {
              const string = eachurl.replace(/^[\W_]+/, "");
              eachurl = string;
            }
            // array_cleanUrl.push(eachurl);
            const request = {
              href: eachurl,
              file: element,
              text: text_
            };
            array_object.push(request);
            resolve(array_object);
          });
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

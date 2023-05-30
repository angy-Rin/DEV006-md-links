const fs = require("fs");
const path = require("path");
// const input = path.join(__dirname, "file.md");
const input = __dirname;
const regExp = /(https?:\/\/[^\s]+)/g;
// const input_path = path.join(__dirname, input)


function principalFunction(input) {
  let array = [];
  return new Promise(function (resolve, reject) {
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
  return new Promise(function (resolve, reject) {
    file.forEach((element, index, longitud) => {
      fs.readFile(element, (err, data) => {
        const url_ = data.toString().match(regExp) || "";
        arrays.push(...url_);
        if (index === longitud.length - 1) {
          resolve(arrays);
        }
      });
    });
  });
}

const https = require('https');

function status(array_links) {
  return new Promise(function(resolve, reject) {
    const array_request = []; // Variable para almacenar los resultados de las solicitudes

    // Función auxiliar para hacer una solicitud GET a un enlace
    //https.get no puede trabajar directamente con iteraciones, los contadores tampoco funcionan. Modifica los
    //iteradores
    function getRequest(link) {
      return new Promise(function(resolve, reject) {
        const request = {
          href: link
        };

        https.get(link, (res) => {
          const { statusCode } = res;

          if (statusCode === 200) {
            request.ok = 'ok';
          } else {
            request.ok = 'fail';
          }

          request.status = statusCode;
          resolve(request);
        }).on('error', (err) => {
          request.ok = 'fail';
          request.status = null;
          resolve(request);
        });
      });
    }

    // Iterar sobre cada enlace y hacer las solicitudes GET
    const promises = array_links.map((link) => {
      return getRequest(link);
    });

    // Esperar a que todas las solicitudes se completen
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


function cleanUrl(string_url) { //limpiar la URL de caracteres especiales al final del string
  return new Promise(function (resolve, reject) {
    const array_cleanUrl = [];
    // iterar por cada URL recibida, mientras se encuentre un caracter especial al final del string, se eliminará
    string_url.forEach((eachurl) => {
      while (/[^\w\s]$/.test(eachurl)) {
        const string = eachurl.replace(/[^\w\s]$/, "");
        eachurl = string;
      }
      array_cleanUrl.push(eachurl);
    });
    resolve(array_cleanUrl);
  });
}

module.exports = function mdLinks(path) {  
  // La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos
  return new Promise((resolve, reject) => {
    principalFunction(path)
      .then((data) => leersincrono(data))
      .then((result) => cleanUrl(result))
      .then((clean_url) => status(clean_url))
      .then((object) => {
        resolve(object); 
      })
      .catch((error) => {
        reject(error); 
      });
  });
};

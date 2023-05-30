const fs = require("fs");
const path = require("path");
// const input = path.join(__dirname, "file.md");
const input = __dirname;
const regExp = /(https?:\/\/[^\s]+)/g;
// const input_path = path.join(__dirname, input)
let array = [];

function principalFunction(input) {
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
const arrays = [];
function leersincrono(file) {
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
    const array_reques = []; // Variable para almacenar los resultados de las solicitudes

    // Función auxiliar para hacer una solicitud GET a un enlace
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
        array_reques.push(...results);
        resolve(array_reques);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


function cleanUrl(string_url) {
  return new Promise(function (resolve, reject) {
    const array_cleanUrl = [];
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

principalFunction(input).then((data) => {
  leersincrono(data).then((result) => {
    cleanUrl(result).then((clean_url) => {
      console.log(clean_url)
       status(clean_url).then((object) => {
        console.log(object)
       })
    });
  });
});

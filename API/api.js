const fs = require("fs");
const path = require("path");
const input = __dirname;
const regExp = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g
// const input_path = path.join(__dirname, input)
let array = [];
function principalFunction(input) {
  return new Promise(function (resolve, reject) {
    if (!fs.existsSync(input)) {
      reject("Directorio/archivo no encontrado");
    } else {
      fs.readdirSync(input).forEach((file) => {
        let fullPath = path.join(input, file);
        if (fs.statSync(fullPath).isDirectory()) {
          principalFunction(fullPath);
        } else if (path.extname(file) === ".md") {
          array.push(fullPath);
        }
      });
    }
    resolve(array);
  });
}

function leersincrono(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data.toString());
    });
  });
}

const array_url = [];

function url(content) {
    return new Promise(function(resolve, reject){
        const url_ = content.match(regExp) || "";
        if(url_ != ""){
            array_url.push(url_)
            resolve(array_url);
        }
    })
}
principalFunction(input).then((data) => {
  data.forEach((file) => {
    leersincrono(file).then((result) => {
      url(result).then((url) => {
        console.log(url);
      })
    });
  });
});

const fs = require("fs");
const path = require("path");
const input = __dirname;
const regExp = /(https?:\/\/[^\s]+)/g;
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
          resolve(array);
        }
      });
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
          if (index === longitud.length -1) {
            console.log(arrays);
          }
      });
    });
  });
}

// function leersincrono(file) {
//     return new Promise(function (resolve, reject) {
//       fs.readFile(file, (err, data) => {
//         if (err) reject(err);
//       const url_ = data.toString().match(regExp) || "";
//           if(url_ != ""){
//               resolve(url_);
//           }
//       });
//     });
//   }

// principalFunction(input).then((data) => {
//     data.forEach((file) => {
//       leersincrono(file).then((result) => {
//         console.log(result)
//       });
//     });
//   });

principalFunction(input).then((data) => {
  console.log(data);
  leersincrono(data).then((result) => {});
});

// function url(content) {
//     return new Promise(function(resolve, reject){
//         const url_ = content.match(regExp) || "";
//         if(url_ != ""){
//             array_url.push(...url_)
//             resolve(array_url);
//         }
//     })
// }

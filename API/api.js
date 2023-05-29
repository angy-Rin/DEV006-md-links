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

const https = require("https");
const array_reques=[];


function status(array_links) {
  return new Promise(function(resolve, reject) {
    array_links.forEach((link, index, longitud) => {
      const request = {};
      https.get(link, (res) => {
          const { statusCode } = res;
          if (statusCode === 200) {
            request['ok'] = 'ok';
          } else {
            request['ok'] = 'fail'; 
          } 
          request['status'] = statusCode; 
          request['href'] = link;
          array_reques.push(request);
          if (index === longitud.length -2 ){
            resolve(array_reques)
          }
        })
    })
  })
}

// function status(array_links) {
//   return new Promise(function(resolve, reject) {
//     array_links.forEach((link, index, longitud) => {
//       https.get(link, (res) => {
//           const { statusCode } = res;
//           if (statusCode === 200) {
//             request['status'] = statusCode; 
//             request['ok'] = 'ok'; 
//             request['href'] = link;
//             array_reques.push(request);
//             resolve(array_reques)
//             res.on("data", (chunk) => {
//               // console.log(chunk.toString());
//             });
//           } else {
//             console.log(` fail ${statusCode}`);
//           } 
//         })
//         .on("error", (err) => {
//           reject.log(err);
//         });
//     });
   
//   })
  
// }

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
       status(clean_url).then((object) => {
        console.log(object)
       })
    });
  });
});

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

// function url(content) {
//     return new Promise(function(resolve, reject){
//         const url_ = content.match(regExp) || "";
//         if(url_ != ""){
//             array_url.push(...url_)
//             resolve(array_url);
//         }
//     })
// }

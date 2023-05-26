const fs = require("fs");
const path = require("path");

// recorrer todos los archivos en un directorio
// function directory(path1){
//     if(!fs.existsSync(path1)) {
//         console.log("Directory not found");
//     } else {
//     fs.readdirSync(path1).forEach((file) => {
//         console.log(file);
//         if(fs.existsSync(file)) {
//             if(fs.statSync(file).isDirectory()) {
//                 const child = path.join(path1,file.toString());
//                 console.log(child)
//                 directory(child)
//             }
//         }
//     })
// }
// };
const array= [];
//recorrer todos los archivos de un directorio con promesa. Resolve trabaja como un return, y se detiene cuando llega a esa linea
function directory(path1) {
  return new Promise(function (resolve, reject) {
    if (!fs.existsSync(path1)) {
      reject("Directory not found");
    } else {
      fs.readdirSync(path1).forEach((file) => {
        let fullPath = path.join(path1, file);
        array.push(file);
        if (fs.statSync(fullPath).isDirectory()) {
          directory(fullPath);
        }
      })
      resolve(array)
    }
  });
}

// function totalpath(path1, path2, callback) {
//   if (!fs.existsSync(path1) || !fs.existsSync(path2)) {
//     console.log("Directory not found");
//   } else {
//     callback("ruta unida: " + path.join(path1, path2));
//   }
// }
//une un path con promesas
function totalpath(path1, path2) {
  return new Promise (function (resolve, reject){
    if (!fs.existsSync(path1) || !fs.existsSync(path2)) {
      reject("Directory not found");
    } else {
      resolve("ruta unida: " + path.join(path1, path2));
    }
  });
}

directory(__dirname).then((data) => {
  data.forEach(file=>{
    console.log(file);
  })
});
totalpath(__dirname,'test').then((totalpath) => {
  console.log(totalpath);
})

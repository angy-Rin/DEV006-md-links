const fs = require('fs');
const path = require('path');

function leer(ruta) {
    return new Promise(function (resolve,reject){
        fs.readFile(ruta, (err,data) =>{
            if(err){
                reject('no se ha encontrado el archivo');
            }else {
                resolve(data.toString());
            }  
    })
    })
}
function escribir(ruta,contenido,callback){
    fs.writeFile(ruta, contenido, function (err) {
        if(err){
            console.error('no he podido escribirlo' + err);
        }else {
            console.log('se ha escrito correctamente');
        }
    })
}
function borrar(ruta, callback) {
    fs.unlink(ruta,callback)
}

function leertipo(ruta,callback){
     fs.readFile(ruta, (error) =>{
        if(error){
            console.error('no se ha encontrado el archivo');
        } else {
            callback(path.extname(ruta));
        }
    })
}
leer(__dirname + '/file.md')
    .then(data => {
        console.log(data);
    }),
leertipo(__dirname + '/file.md',console.log);
// escribir(__dirname + '/file.md', 'holas', console.log)
// leer(__dirname + '/file.md', console.log)
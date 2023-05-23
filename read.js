const fs = require('fs');
const path = require('path');

function leer(ruta, callback) {
    fs.readFile(ruta, (err, data) =>{
        console.log(data.toString());
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
    callback(path.extname(ruta))
}
leertipo(__dirname + '/file.md',console.log);
// escribir(__dirname + '/file.md', 'holas', console.log)
// leer(__dirname + '/file.md', console.log)
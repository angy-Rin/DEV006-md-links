const fs = require('fs');

//devuelve el número de lineas que existen dentro de un archivo. se hace uso del limitador \n a pesar de que 
//textualmente en el documento este no exista
//readFILE asincrono acepta arrow function, pero el sincrono no

function leer(ruta) {
    const result = fs.readFileSync(ruta,"utf8");
    console.log(result.toString().split('\n').length-1);
}

leer(process.argv[2]);



function hola(nombre) {
    return new Promise(function(resolve,reject){
        setTimeout(function () {
            console.log('Hola, '+ nombre);
            resolve(nombre);
        }, 1500);
    })

}

function hablar(nombre) {
    return new Promise (function(resolve, reject){
        setTimeout(function() {
            console.log('Bla bla bla bla...');
            // resolve(nombre);
            reject('HAy un ErroR');
        }, 1000);
    });
   
}

function adios(nombre) {
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            console.log('Adios', nombre);
            resolve();
        }, 1000);
    })
}

//En esta parte del código uso funciones recursivas porque estoy llamando a conversacion dentro de si misma. 
// y mediante un If como estructura de control le digo que cantidad de veces va a  
// ejectuarse la funcion hablar.
function conversacion(nombre, veces, callback) {
    if (veces > 0) {
        hablar(function () {
            conversacion(nombre, --veces, callback);
        })
    } else {
        adios(nombre, callback);
    }
}

// --

// console.log('Iniciando proceso...');
// hola('Angy', function (nombre) {
//     conversacion(nombre, 10, function() {
//         console.log('Proceso terminado');
//     });
// });
console.log('iniciando el proceso');
hola('angy')
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(adios)
    .then(() => {
        console.log('terminado el proceso');
    })
    .catch(error => {
        console.log('ERROR')
    });
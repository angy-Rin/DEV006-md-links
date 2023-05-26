let nombre = process.env.NOMBRE || 'sin nombre';
let web = process.env.MI_WEB || 'no tengo web';
delete process.env.NOMBRE;
console.log('Hola ' + nombre);
console.log('Mi web es: ' + web);

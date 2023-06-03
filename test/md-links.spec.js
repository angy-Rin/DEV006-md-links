const {resolverDirectorio, leerArchivos, validateTrue} = require('../API/utils.js');
const path = require("path");

const input = __dirname;

describe('resolverDirectorio', () => {
  it('Debe resolver la ruta', async () => {
    return resolverDirectorio(input).then(data => {
      expect(data).toEqual([path.join(__dirname, 'lol.md')]);
  });
  });
  it('Debe rechazar la promesa por archivo no existente', async () => {
    return resolverDirectorio("data").catch(data => {
      expect(data).toEqual("Directorio/archivo no encontrado");
  });
  });
  it('Debe rechazar la promesa por parametro no valido', async () => {
    return resolverDirectorio().catch(data => {
      expect(data).toEqual("[TypeError: The 'path' argument must be of type string. Received undefined]");
  });
  });
});


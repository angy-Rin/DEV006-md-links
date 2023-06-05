const {
  resolverDirectorio,
  leerArchivos,
  validateTrue,
} = require("../API/utils.js");
const path = require("path");


// beforeEach(() => {
//   jest.clearAllMocks(); // Limpiar todos los mocks antes de cada prueba
// });

const testCases = [
  { input: "file.md", expected: [path.join("C:\\Users\\cesar\\Documents\\DEV006-md-links\\file.md")]},
  { input: "C:/Users/cesar/Documents/DEV006-md-links/API", expected: [path.join("C:\\Users\\cesar\\Documents\\DEV006-md-links\\API\\","file.md"),
  path.join("C:\\Users\\cesar\\Documents\\DEV006-md-links\\API\\","file2.md"),path.join("C:\\Users\\cesar\\Documents\\DEV006-md-links\\API\\","file3.md"),
  ,path.join("C:\\Users\\cesar\\Documents\\DEV006-md-links\\API\\folder","folder.md")]},
  // Add more test cases as needed
];

testCases.forEach((testCase) => {
  test(`Testing principalFunction with input ${testCase.input}`, () => {
    return expect(resolverDirectorio(testCase.input)).resolves.toEqual(testCase.expected);
  });
});
// describe("resolver ruta", () => {
//   it("Debe resolver la ruta", async () => {
//     const input = __dirname;
//     return resolverDirectorio(input).then((data) => {
//       expect(data).toEqual([
//         path.join(__dirname, "archivotest.md"),
//         path.join(__dirname, "/carpeta/archivocarpeta.md"),
//       ]);
//       // ,path.join(__dirname, 'archivotest.md')]
//     });
//   });
//   it("Debe rechazar la promesa por archivo no existente", async () => {
//     return resolverDirectorio("data").catch((data) => {
//       expect(data).toEqual("Directorio/archivo no encontrado");
//     });
//   });
//   it("debe resolver rchivo con extensión md", async () => {
//     return resolverDirectorio("file2.md").then((data) => {
//       expect(data).toEqual([path.join(__dirname, "file2.md")]);
//     });
//   });
// });

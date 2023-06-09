const https = require("https");
const {
  resolverDirectorio,
  leerArchivos,
  getRequest,
} = require("../utils.js");


const testCases = [
  {
    input: "C:/Users/cesar/Documents/DEV006-md-links/examples/",
    expected: [
      "C:\\Users\\cesar\\Documents\\DEV006-md-links\\examples\\examples2\\file4.md",
      "C:\\Users\\cesar\\Documents\\DEV006-md-links\\examples\\file.md",
      "C:\\Users\\cesar\\Documents\\DEV006-md-links\\examples\\file2.md",
      "C:\\Users\\cesar\\Documents\\DEV006-md-links\\examples\\file3.md",
    ],
  },
  {
    input: "file.md",
    expected: ["C:\\Users\\cesar\\Documents\\DEV006-md-links\\file.md"],
  },
  {
    input: "file2.md",
    expected: ["C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md"],
  },
];

testCases.forEach((testCase) => {
  test(`Testing principalFunction with input ${testCase.input}`, async () => {
    const result = await resolverDirectorio(testCase.input);
    expect(result).toEqual(testCase.expected);
  });
});
test(`ResolverDirectorio con un archivo que no existe`, () => {
  const nonExistentPath = "no-existo.md";

  return expect(resolverDirectorio(nonExistentPath)).rejects.toEqual(
    "C:\\Users\\cesar\\Documents\\DEV006-md-links\\no-existo.md Directorio/archivo no encontrado"
  );
});
test(`resolverDirectorio con un archivo que no es .md`, () => {
  const nonExistentPath = "thumb.png";

  return expect(resolverDirectorio(nonExistentPath)).rejects.toEqual(
    "C:\\Users\\cesar\\Documents\\DEV006-md-links\\thumb.png no es un MARKDOWN"
  );
});
test(`resolverDirectorio con una entrada que no es tipo string`, () => {
  const noanString = {key:"value"};

  return expect(resolverDirectorio(noanString)).rejects.toEqual("El path debe ser un string");
});

test(`leerArchivos `, async () => {
  const obj = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://www.youtube.com/watch?v=Lub5qOmY4JQ",
      text: "recurso",
    },
  ];
  const result = await leerArchivos(testCases[2].expected);
  expect(result).toEqual(obj);
});

 
test(`peticiónHttps con status ok `, async () => {
  const mockGet = jest.spyOn(https, 'get').mockImplementation((url, callback) => {
    // comportamiento del callback de https.get
  
    // Simular un objeto 'res' con una propiedad 'statusCode' para probar diferentes casos
    const res = {
      statusCode: 200,
      on: jest.fn().mockImplementation((event, eventCallback) => {
        if (event === 'end') {
          // Simula el evento 'end' llamando al callback, esto cubre la linea 79
          eventCallback();
        }
      }),
    };
  
    // Llama al callback simulado con el objeto 'res'
    callback(res);
  });

  // Llama a la función getRequest con el enlace deseado
  const link = { href: 'https://existelaurl.html' };
  getRequest(link).then((result) => {
    // Verifica los resultados esperados
    expect(result.ok).toBe('ok');
    expect(result.status).toBe(200);

    // Restaura la implementación original de https.get
    mockGet.mockRestore();
  });
});

test(`peticiónHttps con status 404 `, async () => {
  const mockGet = jest.spyOn(https, 'get').mockImplementation((url, callback) => {
    const res = { statusCode: 404 };
    callback(res);
  });
  const link = { href: 'https://linkroto.html' };
  getRequest(link).then((result) => {
    // Verifica los resultados esperados
    expect(result.ok).toBe('fail');
    expect(result.status).toBe(404);

    // Restaura la implementación original de https.get
    mockGet.mockRestore();
  });
});
test('Prueba de getRequest con error de conexión', async () => {

  const mockGet = jest.spyOn(https, 'get');

  // Simula el evento 'error' llamando al callback con un objeto Error
  const error = new Error('Error de conexión');
  const resMock = {
    on: jest.fn().mockImplementation((event, eventCallback) => {
      if (event === 'error') {
        eventCallback(error);
      }
    }),
  };
  mockGet.mockReturnValueOnce(resMock);

  // Llama a la función getRequest con el enlace deseado
  const link = { href: 'https://nohayconexion.com' };
  return getRequest(link).then((result) => {
    // Verifica que se haya ejecutado el callback de error
    expect(result.status).toBe(error);
    mockGet.mockRestore();
  });
});

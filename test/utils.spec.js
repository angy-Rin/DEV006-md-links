const https = require("https");
const { resolverDirectorio, leerArchivos, getRequest } = require("../utils.js");

jest.mock("https");

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
    "C:\\Users\\cesar\\Documents\\DEV006-md-links\\no-existo.md Directory/file not found"
  );
});
test(`resolverDirectorio con un archivo que no es .md`, () => {
  const nonExistentPath = "thumb.png";

  return expect(resolverDirectorio(nonExistentPath)).rejects.toEqual(
    "C:\\Users\\cesar\\Documents\\DEV006-md-links\\thumb.png is not a markdown"
  );
});
test(`resolverDirectorio con una entrada que no es tipo string`, () => {
  const noanString = { key: "value" };

  return expect(resolverDirectorio(noanString)).rejects.toEqual(
    "The path must be a string"
  );
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
   https.get = jest.fn().mockImplementation((url, callback) => {
    // Simula un status code 200 (OK)
    const mockResponse = {
      statusCode: 200,
      on: (event, handler) => {
        if (event === "end") {
          handler();
        }
      },
    };

    // Ejecuta el callback con la respuesta simulada
    callback(mockResponse);
    return {
      on: jest.fn(),
    };
  });
  const link = { href: "https://existelaurl.html" };
  // Realiza la llamada a la función getRequest()
  return getRequest(link).then((result) => {
    // Verifica que el link tenga el estado "ok"
    
    // Verifica que el link tenga el status code 200
    expect(result.status).toBe(200);
  });
});


  // Llama a la función getRequest con el enlace deseado
  // const link = { href: "https://existelaurl.html" };
  // getRequest(link).then((result) => {
  //   // Verifica los resultados esperados
  //   expect(result.ok).toEqual("ok");
  //   expect(result.status).toBe(200);

  //   // Restaura la implementación original de https.get
  //   mockGet.mockRestore();
  // });


test(`peticiónHttps con status 404 `, async () => {
  https.get = jest.fn().mockImplementation((url, callback) => {
    // Simula un status code 200 (OK)
    const mockResponse = {
      statusCode: 404,
      on: (event, handler) => {
        if (event === "end") {
          handler();
        }
      },
    };

    // Ejecuta el callback con la respuesta simulada
    callback(mockResponse);
    return {
      on: jest.fn(),
    };
  });
  const link = { href: "https://linkroto.html" };
  getRequest(link).then((result) => {
    // Verifica los resultados esperados
    expect(result.ok).toBe("fail");
    expect(result.status).toBe(404);

  });
});
test("Prueba de getRequest con error de conexión", async () => {
  const mockGet = jest.spyOn(https, "get");

  // Simula el evento 'error' llamando al callback con un objeto Error
  const error = new Error("Error de conexión");
  const resMock = {
    on: jest.fn().mockImplementation((event, eventCallback) => {
      if (event === "error") {
        eventCallback(error);
      }
    }),
  };
  mockGet.mockReturnValueOnce(resMock);

  // Llama a la función getRequest con el enlace deseado
  const link = { href: "https://nohayconexion.com" };
  return getRequest(link).then((result) => {
    // Verifica que se haya ejecutado el callback de error
    expect(result.status).toBe("error");
    mockGet.mockRestore();
  });
});
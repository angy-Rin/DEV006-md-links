const https = require("https")
const mdLinks = require("../index");
jest.mock("https");

const obj_result_true = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://www.youtube.com/watch?v=Lub5qOmY4JQ",
      text: "recurso",
      ok:"ok",
      status: 200,
    },
  ];

  const obj_result_false = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://www.youtube.com/watch?v=Lub5qOmY4JQ",
      text: "recurso",
    },
  ];

const path  = "file2.md"
test(`mdLinks con validate:true`, async () => {
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
    const result = await mdLinks(path,{validate:true});
    expect(result).toEqual(obj_result_true);
  });

test(`mdLinks sin agumento validate`, async () => {
    const result = await mdLinks(path);
    expect(result).toEqual(obj_result_false);
});
  
test('mdLinks sin agumentos', () => {
    return expect(mdLinks()).rejects.toEqual("The path must be a string");
  });
  
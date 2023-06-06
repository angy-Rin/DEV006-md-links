const {
  resolverDirectorio,
  leerArchivos,
  validateTrue,
} = require("../utils.js");
const path = require("path");

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
  const obj = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://www.youtube.com/watch?v=Lub5qOmY4JQ",
      text: "recurso",
    },
  ];
  const obj_result = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://www.youtube.com/watch?v=Lub5qOmY4JQ",
      text: "recurso",
      ok:"ok",
      status: 200,
    },
  ];
  const result = await validateTrue(obj);
  expect(result).toEqual(obj_result);
});

test(`peticiónHttps con fail`, async () => {
  const obj = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://github.com/angy-1",
      text: "link_404",
    },
  ];
  const obj_result = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://github.com/angy-1",
      text: "link_404",
      ok:"fail",
      status: 404,
    },
  ];
  const result = await validateTrue(obj);
  expect(result).toEqual(obj_result);
});

test(`peticiónHttps con fail`, async () => {
  const obj = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://githubew.com/",
      text: "link_inexistente",
    },
  ];
  const obj_result = [
    {
      file: "C:\\Users\\cesar\\Documents\\DEV006-md-links\\file2.md",
      href: "https://githubew.com/",
      text: "link_inexistente",
      ok:"fail",
      status: null,
    },
  ];
  const result = await validateTrue(obj);
  expect(result).toEqual(obj_result);
});
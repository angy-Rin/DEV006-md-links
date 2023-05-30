const mdLinks = require("./api");

mdLinks("file.md").then((links) => {
  console.log(links);
  })
  .catch((err) => {
    console.log(err);
  })


mdLinks(__dirname).then((links) => {
  console.log(links);
  })
  .catch((err) => {
    console.log(err);
  })



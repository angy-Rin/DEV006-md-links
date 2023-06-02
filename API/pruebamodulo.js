const mdLinks = require("./api");

// mdLinks("file.md", {validate:false}).then((links) => {
//   console.log(links);
//   })
//   .catch((err) => {
//     console.log(err);
//   })


mdLinks(__dirname).then((links) => {
  console.log(links);
  })
  .catch((err) => {
    console.log(err);
  })



const mdLinks = require("./api");

mdLinks("file.md", {validate:true}).then((links) => {
  console.log(links);
  })
  .catch((err) => {
    console.log(err);
  })


// mdLinks(__dirname,{validate:true}).then((links) => {
//   console.log(links);
//   })
//   .catch((err) => {
//     console.log(err);
//   })



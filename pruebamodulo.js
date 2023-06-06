const mdLinks = require("./index.js");

// mdLinks("file.md", {validate:false}).then((links) => {
//   console.log(links);
//   })
//   .catch((err) => {
//     console.log(err);
//   })


mdLinks("file.md", {validate:true}).then((links) => {
  console.log(links);
  })
  .catch((err) => {
    console.log(err);
  })

mdLinks("./examples", {validate:true}).then((links) => {
    console.log(links);
    })
    .catch((err) => {
      console.log(err);
    })
  


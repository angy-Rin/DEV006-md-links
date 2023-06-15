const mdLinks = require("./index.js");

// mdLinks("file.md", {validate:false}).then((links) => {
//   console.log(links);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

mdLinks("./exampless", { validate: true })
  .then((links) => {
    console.log(links);
    console.log("FINAL RESULT", links.length);
  })
  .catch((err) => {
    console.log(err);
    console.log("FINAL CATCH:",err );
  });

// mdLinks("./examples", {validate:true}).then((links) => {
//     console.log(links);
//     })
//     .catch((err) => {
//       console.log(err);
//     })

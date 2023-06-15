const mdLinks = require("./index.js");

mdLinks("./examples/examples2", { validate: false })
  .then((links) => {
    console.log(links);
    console.log("FINAL RESULT", links.length);
  })
  .catch((err) => {
    console.log(err);
    console.log("FINAL CATCH:",err );
  });

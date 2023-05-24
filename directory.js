const fs = require('fs');
const path = require('path')

// function directory(path1){
//     if(!fs.existsSync(path1)) {
//         console.log("Directory not found");
//     } else {
//     fs.readdirSync(path1).forEach((file) => {
//         console.log(file);
//         if(fs.existsSync(file)) {
//             if(fs.statSync(file).isDirectory()) {
//                 const child = path.join(path1,file.toString());
//                 console.log(child)
//                 directory(child)
//             } 
//         }   
//     })
// }
// };

function directory(path1) {
    if(!fs.existsSync(path1)) {
         console.log("Directory not found");
     } else {
    fs.readdirSync(path1).forEach(file => {
      let fullPath = path.join(path1, file);
      console.log(file);
      if (fs.statSync(fullPath).isDirectory()) {
         directory(fullPath);
      }
    });
  }
}


// directory(__dirname, console.log);
directory(__dirname);

function totalpath(path1,path2,callback){
    if(!fs.existsSync(path1) || !fs.existsSync(path2) ) {
        console.log("Directory not found");
    } else {
    callback(path.join(path1,path2))
    }
}

// totalpath(__dirname,'test', console.log);
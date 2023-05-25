const fs = require('fs')
const path = require('path');

module.exports = function (folder,ext,callback){
fs.readdir(folder, function (err, files) {
  if (err) return callback(err,null) 
    files = files.filter(file => path.extname(file) === '.'+ ext) 
    return callback(null, files);      
  })
}

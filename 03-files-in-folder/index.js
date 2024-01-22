const fs = require('fs')
const path = require('node:path')

const pathToRead = __dirname + "/secret-folder"

fs.readdir(pathToRead,  (err, files) =>{
  if (err){console.log(err)}
  else {
    files.forEach(file => {
      fs.stat(pathToRead + `/${file}`, (err, stats) => {
        if (err){console.log(err)}
        else if(stats.isFile()){
          const fileSize = stats.size
          console.log(`${path.parse(file).name}-${path.extname(file)}-${fileSize}`)
        }
      })
    })
  }
})
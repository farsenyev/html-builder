const fs = require('fs')
const path = require('node:path')

const stylePath = path.join(__dirname, 'styles')
const projectPath = path.join(__dirname, 'project-dist')

fs.readdir(stylePath, (err, files)=>{
  if (err){console.log(err)}
  else{
    const styles = []
    let counter = 0
    files.forEach(file => {
      fs.stat(stylePath + `/${file}`, (err, stats) => {
        if (stats.isFile() && path.extname(file).toLowerCase() === '.css'){
          counter ++
          fs.readFile(stylePath + `/${file}`,'utf8', (err, data)=>{
            if (err) {console.log(err)}
            else{
              styles.push(data)
              if (styles.length === counter){
                const style = styles.join('\n')
                  fs.writeFile(`${projectPath}/bundle.css`, style, 'utf8', (err)=>{
                    if (err) console.log(err)
                  })
              }
            }
          })
        }
      })
    })
  }
})


const fs = require('fs')
const path = require('node:path')
const readline = require('node:readline')
const {stdin: input, stdout: output} = require('node:process')

const filePath = __dirname + '/02-write-file.txt'

const rl = readline.createInterface({input, output})

function writeToFile(text){
  fs.appendFile(filePath, text + '\n', (err)=>{
    if (err){
      console.log('Error', err)
    }else{
      rl.prompt()
    }
  })
}

// rl.question('Write txt\n',(answer)=>{
//   fs.writeFile(filePath, answer, (err)=>{})
//
//   console.log('text has been written')
// })

rl.on('SIGINT', ()=>{
  console.log('\nBye!')
  rl.close()
})

rl.on('line', (input)=>{
  writeToFile(input)
})

console.log('Hey, write your txt')
rl.prompt()
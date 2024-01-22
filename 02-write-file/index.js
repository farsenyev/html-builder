const fs = require('fs')
const path = require('node:path')
const process = require('node:process')

const filePath = __dirname + '/02-write-file.txt'

const txtToWrite = 'aaa'

process.on('SIGINT', ()=>{
  process.abort()
})

fs.writeFile(filePath, txtToWrite, (err)=>{})
const fs = require('fs')
const path = require('node:path')
const { encode } = require('querystring')

const filename = __dirname + "/text.txt"

let stream = new fs.ReadStream(filename, {encoding: 'utf-8'})

stream.on('readable', function(){
  let data = stream.read()
  console.log(data)
})
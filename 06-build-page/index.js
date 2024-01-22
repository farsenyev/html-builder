const fs = require('fs').promises;
const path = require('node:path');

const componentPath = path.join(__dirname, 'components');
const stylePath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets')
const mainPath = path.join(__dirname);
fs.mkdir(mainPath + '/project-dist');
const newDir = path.join(__dirname, 'project-dist');
const newAssetsDir = path.join(newDir, 'assets')

async function buildHTML(){
  try{
    //create index.html

    let tData = await fs.readFile(mainPath + '/template.html');
    const files = await fs.readdir(componentPath);

    await Promise.all(files.map(async (file) => {
      const newData = await fs.readFile(componentPath + `/${file}`, 'utf8');
      const fileName = path.parse(file).name

      tData = tData.toString().replace(`{{${fileName}}}`, newData);
    }))
    await fs.writeFile(`${newDir}/index.html`, tData, 'utf8');

  }
  catch(err){
    console.log(err);
  }
}

async function buildCSS(){
  //create styles.css
  try{
    const styles = [];
    const filesStyle = await fs.readdir(stylePath);
    let fileCounter = 0;

    await Promise.all(filesStyle.map(async (fileStyle) => {
      const statsStyle = await fs.stat(stylePath + `/${fileStyle}`);

      if (statsStyle.isFile() && path.extname(fileStyle).toLowerCase() === '.css'){
        fileCounter++
        const dataStyle = await fs.readFile(stylePath + `/${fileStyle}`, 'utf8');
        styles.push(dataStyle);
      }
      if (styles.length === fileCounter){
        const style = styles.join('\n');
        await fs.writeFile(`${newDir}/style.css`, style, 'utf8');
      }
    }))
  }
  catch(err){
    console.log(err);
  }
}

async function buildASSETS(rootDir, distDir){
  try {
    // await fs.access(rootDir)
    await fs.mkdir(distDir)
    //create assets
    const filesAssets = await fs.readdir(rootDir);

    await Promise.all(filesAssets.map(async (assFile) => {
      const statsAss = await fs.stat(rootDir + `/${assFile}`);
      const newRoot = path.join(rootDir, assFile);
      console.log(assFile)
      const newDist = path.join(distDir, assFile);

      if (statsAss.isFile()){
        const dataAss = await fs.readFile(newRoot, 'utf8');
        await fs.writeFile(newDist, dataAss, 'utf8')
      }else if (statsAss.isDirectory()){
        // await fs.mkdir(newRoot)
        await buildASSETS(newRoot, newDist)
      }
    }));

    const finalFiles = await fs.readdir(distDir);
    const fileDel = finalFiles.filter(file => !filesAssets.includes(file));
    await Promise.all(fileDel.map(async (fileDel)=>{
      const fileDelPath = path.join(distDir, fileDel);
      await fs.unlink(fileDelPath)
    }))

  } catch (err) {
    console.error('Error:', err.message);
  }
}

buildHTML();
buildCSS();
buildASSETS(assetsPath, newAssetsDir)

// fs.mkdir(newDir,(err)=>{if (err) console.log(err)})
//
// fs.readFile(mainPath + '/template.html', 'utf8', (err, data)=>{
//   if (err) {console.log(err)}
//   else{
//     const tData = data
//     fs.readdir(componentPath, (err, files)=>{
//       if (err) {console.log(err)}
//       else {
//         files.forEach(file => {
//           fs.readFile(componentPath + `/${file}`, 'utf8', (err, dataComp) => {
//             if (err) {console.log(err)}
//             else {
//               const fileName = path.parse(file).name
//               newData = tData.replace(`{{${fileName}}}`, dataComp)
//             }
//           })
//         })
//         fs.writeFile(newDir + '/index.html', newData, 'utf8', (err)=>{
//           if (err) {console.log(err)}
//         })
//       }
//     })
//   }
//
// })
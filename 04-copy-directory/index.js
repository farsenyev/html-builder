const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  try {
    const sourse = path.join(__dirname, 'files');
    const dest = path.join(__dirname, 'files-copy');

    await fs.access(sourse);
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(sourse);

    await Promise.all(files.map(async (file) => {
      const soursePath = path.join(sourse, file);
      const destPath = path.join(dest, file);

      const stats = await fs.stat(soursePath);

      if (stats.isFile()) {
        const data = await fs.readFile(soursePath, 'utf8');
        await fs.writeFile(destPath, data, 'utf8');
      } else if (stats.isDirectory()) {
        await copyDir(soursePath, destPath);
      }
    }));

    const finalFiles = await fs.readdir(dest);
    const fileDel = finalFiles.filter(file => !files.includes(file));
    await Promise.all(fileDel.map(async (fileDel) => {
      const filePathDel = path.join(dest, fileDel);
      await fs.unlink(filePathDel);
    }));

  } catch (err) {
    console.error('Error:', err.message);
  }
}

copyDir();
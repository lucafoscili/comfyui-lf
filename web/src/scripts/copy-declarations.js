const fs = require('fs-extra');
const path = require('path');
const logColor = '\x1b[34m%s\x1b[0m'; // blue
console.log(logColor, '*---------------------------------*');
console.log(logColor, '*       C o p y   t y p e s       *');
console.log(logColor, '*---------------------------------*');
console.log(logColor, 'Beginning the copy of Ketchup Lite declarations...');

async function copyKetchupTypes() {
  try {
    const sourceDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'node_modules',
      'ketchup-lite',
      'dist',
      'types',
    );
    const destDir = path.join(__dirname, '..', 'types');
    console.log(logColor, '*---*');
    console.log(logColor, 'Source dir:' + sourceDir);
    console.log(logColor, 'Destination dir:' + destDir);
    console.log(logColor, '*---*');

    const files = await fs
      .readdir(sourceDir, { withFileTypes: true })
      .then((dirents) =>
        dirents.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.d.ts')),
      );

    await fs.ensureDir(destDir);

    for (const file of files) {
      const srcPath = path.join(sourceDir, file.name);
      const destPath = path.join(destDir, file.name);
      await fs.copy(srcPath, destPath);
      console.log(logColor, `Copied ${file.name} to ${destPath}`);
      console.log(' ');
    }

    console.log(logColor, '*---*');
    console.log(logColor, `Successfully copied ketchup-lite types to ${destDir}`);
  } catch (error) {
    console.log(logColor, '*---*');
    console.error(logColor, `Failed to copy ketchup-lite types: ${error.message}`);
  }
}

copyKetchupTypes();

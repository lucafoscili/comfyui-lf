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
    const destDir = path.join(__dirname, '..', 'types', 'ketchup-lite');

    console.log(logColor, '*---*');
    console.log(logColor, 'Source dir:' + sourceDir);
    console.log(logColor, 'Destination dir:' + destDir);
    console.log(logColor, '*---*');

    const dirents = await fs.readdir(sourceDir, { withFileTypes: true });

    await fs.ensureDir(destDir);

    for (const dirent of dirents) {
      const srcPath = path.join(sourceDir, dirent.name);
      const destPath = path.join(destDir, dirent.name);
      if (dirent.isDirectory()) {
        await copyKetchupTypesRecursive(srcPath, destPath);
        console.log(logColor, `Directory ${dirent.name} created.`);
      } else {
        await fs.copy(srcPath, destPath);
        console.log(logColor, '*---*');
        console.log(logColor, `Copied ${dirent.name} to ${destPath}`);
      }
    }

    console.log(logColor, '*---*');
    console.log(logColor, `Successfully copied ketchup-lite types to ${destDir}`);
  } catch (error) {
    console.log(logColor, '*---*');
    console.error(logColor, `Failed to copy ketchup-lite types: ${error.message}`);
  }
}

async function copyKetchupTypesRecursive(srcDir, destDir) {
  const dirents = await fs.readdir(srcDir, { withFileTypes: true });
  await fs.ensureDir(destDir);

  for (const dirent of dirents) {
    const srcPath = path.join(srcDir, dirent.name);
    const destPath = path.join(destDir, dirent.name);
    if (dirent.isDirectory()) {
      await copyKetchupTypesRecursive(srcPath, destPath);
      console.log(logColor, `Directory ${dirent.name} created.`);
    } else {
      await fs.copy(srcPath, destPath);
      console.log(logColor, '*---*');
      console.log(logColor, `Copied ${dirent.name} to ${destPath}`);
    }
  }
}

copyKetchupTypes();

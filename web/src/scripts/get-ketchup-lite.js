const fs = require('fs-extra'); // Use fs-extra for easier file operations
const path = require('path');
const logColor = '\x1b[34m%s\x1b[0m'; // cyan

console.log(logColor, '*---------------------------------*');
console.log(logColor, '*    K e t c h u p   L i t e      *');
console.log(logColor, '*---------------------------------*');

async function copyKetchupLiteFiles() {
  try {
    console.log(logColor, 'Beginning the copy of Ketchup Lite files...');

    // Define source and destination paths for esm files
    const sourceDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'node_modules',
      'ketchup-lite',
      'dist',
      'esm',
    );
    const destDir = path.join(__dirname, '..', '..', 'deploy', 'js', 'ketchup-lite');

    // Define source and destination paths for assets
    const assetsSourceDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'node_modules',
      'ketchup-lite',
      'dist',
      'ketchup-lite',
      'assets',
    );
    const assetsDestDir = path.join(__dirname, '..', '..', 'deploy', 'assets');

    console.log(logColor, '*---*');
    console.log(logColor, 'Source dir:' + sourceDir);
    console.log(logColor, 'Destination dir:' + destDir);
    console.log(logColor, 'Assets source dir:' + assetsSourceDir);
    console.log(logColor, 'Assets destination dir:' + assetsDestDir);

    // Ensure the destination directory exists
    await fs.ensureDir(destDir);

    // Copy all files from the source directory to the destination directory,
    // overwriting any existing files
    await fs.copy(sourceDir, destDir, {
      overwrite: true, // Overwrite existing files
    });

    // Copy the assets directory to the destination directory
    await fs.copy(assetsSourceDir, assetsDestDir, {
      overwrite: true, // Overwrite existing files
    });

    console.log(logColor, '*---*');
    console.log(logColor, 'Successfully copied ketchup-lite files and assets.');
  } catch (error) {
    console.log(logColor, '*---*');
    console.error(logColor, 'Failed to copy ketchup-lite files or assets:', error);
  }
}

copyKetchupLiteFiles();

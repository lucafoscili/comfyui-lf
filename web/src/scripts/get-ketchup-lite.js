const fs = require('fs-extra'); // Use fs-extra for easier file operations
const path = require('path');
const logColor = '\x1b[34m%s\x1b[0m'; // cyan

async function copyKetchupLiteFiles() {
  try {
    console.log(logColor, '*---------------------------------*');
    console.log(logColor, '*    K e t c h u p   L i t e      *');
    console.log(logColor, '*---------------------------------*');
    console.log(logColor, 'Beginning the copy of Ketchup Lite files...');
    // Define source and destination paths
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

    console.log(logColor, 'Source dir:' + sourceDir);
    console.log(logColor, 'Destination dir:' + destDir);

    // Ensure the destination directory exists
    await fs.ensureDir(destDir);

    // Copy all files from the source directory to the destination directory,
    // overwriting any existing files
    await fs.copy(sourceDir, destDir, {
      overwrite: true, // Overwrite existing files
    });

    console.log(logColor, 'Successfully copied ketchup-lite files.');
  } catch (error) {
    console.error(logColor, 'Failed to copy ketchup-lite files:', error);
  }
}

copyKetchupLiteFiles();

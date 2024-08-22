const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const logColor = '\x1b[35m%s\x1b[0m'; // magenta
console.log(logColor, '*---------------------------------*');
console.log(logColor, '*     C o m p i l e   S c s s     *');
console.log(logColor, '*---------------------------------*');

// Directory containing SCSS files
const sassDir = path.join(__dirname, '../../../node_modules/.bin/sass');
const scssDir = path.join(__dirname, '../styles');
const cssDir = path.join(__dirname, '../../deploy/css');

console.log(logColor, 'Sass dir: ' + sassDir);
console.log(logColor, 'Scss dir: ' + scssDir);
console.log(logColor, 'Css dir: ' + cssDir);

if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}
// Find all SCSS files in the directory
const scssFiles = fs
  .readdirSync(scssDir)
  .filter((file) => file.endsWith('.scss'))
  .map((file) => path.join(scssDir, file));

// Compile each SCSS file with output path
scssFiles.forEach((file) => {
  const cssFile = file.replace(/\.scss$/, '.css').replace(scssDir, cssDir);
  console.log(logColor, `Compiling ${file} to ${cssFile}`);
  try {
    execSync(`${sassDir} ${file} ${cssFile}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(logColor, `Error compiling ${file}:`, error);
  }
});

console.log(
  logColor,
  'SCSS Files:',
  scssFiles.map((file) => path.basename(file)),
);

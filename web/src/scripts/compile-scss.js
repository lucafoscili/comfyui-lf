const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Directory containing SCSS files
const sassDir = path.join(__dirname, '../../../node_modules/.bin/sass');
const scssDir = path.join(__dirname, '../styles');
const cssDir = path.join(__dirname, '../../deploy/css');


console.log("Sass dir: " + sassDir);
console.log("Scss dir: " + scssDir);
console.log("Css dir: " + cssDir);

if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
}
// Find all SCSS files in the directory 
const scssFiles = fs.readdirSync(scssDir)
  .filter(file => file.endsWith('.scss'))
  .map(file => path.join(scssDir, file));

// Compile each SCSS file with output path
scssFiles.forEach(file => { 
  const cssFile = file.replace(/\.scss$/, '.css').replace(scssDir, cssDir);
  console.log(`Compiling ${file} to ${cssFile}`);
  try {
    execSync(`${sassDir} ${file} ${cssFile}`, { stdio: 'inherit' });
} catch (error) {
    console.error(`Error compiling ${file}:`, error);
}
}); 

console.log("SCSS Files:", scssFiles.map(file => path.basename(file))); 
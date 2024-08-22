const fs = require('fs');
const path = require('path');

// Starting directory, relative to the script's location
const baseDir = path.resolve(__dirname, '../../deploy/js/');

// Function to recursively search for files
function searchFiles(dir) {
    const results = [];
    const list = fs.readdirSync(dir);

    list.forEach(function (file) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results.push(...searchFiles(filePath)); // Recurse into subdirectories
        } else if (file.endsWith('.js')) {
            results.push(filePath); // Add .js files to the results
        }
    });

    return results;
}

// Function to update import paths
function updateImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = /import\s+[^'"]*['"]([^'"]+)['"]/g;
    let match;

    let modified = false;

    while ((match = regex.exec(content)) !== null) {
        let importPath = match[1];

        // Check if the import path is relative and missing the .js extension
        if (importPath.startsWith('.') && !importPath.endsWith('.js')) {
            importPath += '.js';
            content = content.replace(match[1], importPath);
            modified = true;
        }

        // Check if the import path includes '/helpers/' and doesn't have .js
        if (importPath.includes('/helpers/') && !importPath.endsWith('.js')) {
            importPath += '.js';
            content = content.replace(match[1], importPath);
            modified = true;
        }
    }

    // Write the updated content back to the file
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

// Search for all .js files and update their imports
const files = searchFiles(baseDir);
files.forEach(updateImports);

console.log('All done! Look at you, making your imports fancy with those .js extensions!'); // ChatGPT, Dr. Smartypants :V

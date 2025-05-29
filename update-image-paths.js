const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src/components');

function updateImportPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update import statements
  content = content.replace(/from ['"](\.\.\/\.\.\/|\.\.\/)?assets\/([^'"]+)\.(png|jpg|jpeg)['"]/g, 
    (match, prefix, name) => `from '${prefix || ''}assets/${name}.webp'`);
  
  // Update require statements
  content = content.replace(/require\(['"](\.\.\/\.\.\/|\.\.\/)?assets\/([^'"]+)\.(png|jpg|jpeg)['"]\)/g,
    (match, prefix, name) => `require('${prefix || ''}assets/${name}.webp')`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.jsx')) {
      updateImportPaths(filePath);
    }
  }
}

walkDir(componentsDir);

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src/assets');

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  
  for (const file of files) {
    if (!['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())) continue;
    
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, `${path.parse(file).name}.webp`);
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .resize({ width: 1200, withoutEnlargement: true })
        .toFile(outputPath);
      
      console.log(`Optimized: ${file} -> ${path.parse(file).name}.webp`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

optimizeImages();

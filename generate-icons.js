const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [16, 48, 128];
const inputPath = path.resolve(__dirname, "src/default-icon.png");
const outputDir = path.resolve(__dirname, "public/icons");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach((size) => {
  sharp(inputPath)
    .resize(size, size)
    .toFile(path.resolve(outputDir, `icon-${size}.png`), (err, info) => {
      if (err) {
        console.error(`Error generating icon-${size}.png:`, err);
      } else {
        console.log(`Generated icon-${size}.png`);
      }
    });
});

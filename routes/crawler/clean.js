const fs = require("fs");
const path = require("path");

function cleanImg (folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const curPath = path.join(folderPath, file);
      fs.unlinkSync(curPath);
    });
  }
}

module.exports.cleanImg = cleanImg;
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src'); // Adjust the path to your source directory

const addUseClientDirective = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stat) => {
        if (err) {
          return console.log('Error stating file: ' + err);
        }

        if (stat.isDirectory()) {
          addUseClientDirective(filePath);
        } else if (path.extname(file) === '.js' || path.extname(file) === '.jsx' || path.extname(file) === '.ts' || path.extname(file) === '.tsx') {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              return console.log(err);
            }

            if (!data.includes('"use client"')) {
              const newContent = '"use client";\n' + data;
              fs.writeFile(filePath, newContent, 'utf8', (err) => {
                if (err) return console.log(err);
              });
            }
          });
        }
      });
    });
  });
};

addUseClientDirective(directoryPath);

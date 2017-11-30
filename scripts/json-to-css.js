/**
 * @Author: Sil van Diepen <silvandiepen>
 * @Date:   2017-11-30T10:56:37+01:00
 * @Email:  sil@matise.nl
 * @Last modified by:   silvandiepen
 * @Last modified time: 2017-11-30T11:55:33+01:00
 * @Copyright: Matise
 */

let fs = require('fs');
let flatten = require('flat');


let delimiter = '-';
let sourceFolder = 'data';
let fileTypes = ['scss','less','css'];

/**
 * Get all setting files from /data
 */
function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  console.log(files_);
  return files_;
}

/**
 * Read the JSON file and convert to Objects with Arrays
 */
function readData(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function jsonToCss(file){
  let data = flatten(file,{delimiter: delimiter});
  let variable;
  let newFile = [];
  console.log(typeof data);
  Object.keys(data).forEach((key,value) => {
    variable = '--'+key.toLowerCase() + ': '+ value+ ';';
    newFile.push(variable);
  });
  return newFile.join("\r\n");
}
function jsonToScss(file){
  let data = flatten(file,{delimiter: delimiter});
  let variable;
  let newFile = [];
  console.log(typeof data);
  Object.keys(data).forEach((key,value) => {
    variable = '$'+key.toLowerCase() + ': '+ value+ ';';
    newFile.push(variable);
  });
  return newFile.join("\r\n");
}
function jsonToLess(file){
  let data = flatten(file,{delimiter: delimiter});
  let variable;
  let newFile = [];
  console.log(typeof data);
  Object.keys(data).forEach((key,value) => {
    variable = '@'+key.toLowerCase() + ': '+ value+ ';';
    newFile.push(variable);
  });
  return newFile.join("\r\n");
}
/**
 * Convert the Data to specific language variables and lists
 */
function convertData(file, type) {

  let compiled;
  switch(type) {
     case "scss": {
        compiled = jsonToScss(file);
        break;
     }
     case "css": {
        compiled = jsonToCss(file);
        break;
     }
     case "less": {
        compiled = jsonToLess(file);
        break;
     }
  }
  return compiled;
}

/**
 * Define the folder and get the files
 */

let jsonFiles = getFiles(sourceFolder);


/**
 * Convert all files
 */

jsonFiles.forEach((file) => {

  fileTypes.forEach((type) => {

    // Write New Files
    let compiled = convertData(readData(file), type);
    fs.writeFileSync('test/compiled/compiled.'+type, compiled, function(err) {
      console.log('woops, something went wrong!');
    });

  });
});

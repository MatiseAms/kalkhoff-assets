/**
 * @Author: Sil van Diepen <silvandiepen>
 * @Date:   2017-11-30T10:56:37+01:00
 * @Email:  sil@matise.nl
 * @Last modified by:   stephan
 * @Last modified time: 2017-11-30T12:19:21+01:00
 * @Copyright: Matise
 */

let fs = require('fs');
let path = require('path');
let flatten = require('flat');


let delimiter = '-';
let sourceFolder = 'data';
let fileTypes = ['scss', 'less', 'css'];

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

function jsonToCss(file) {
	let data = flatten(file, {
		delimiter: delimiter
	});
	let variable;
	let newFile = [];
	console.log(typeof data);
	Object.keys(data).forEach((key, value) => {
		variable = '--' + key.toLowerCase() + ': ' + value + ';';
		newFile.push(variable);
	});
	return newFile.join('\r\n');
}

function jsonToScss(file) {
	let data = flatten(file, {
		delimiter: delimiter
	});
	let variable;
	let newFile = [];
	console.log(typeof data);
	Object.keys(data).forEach((key) => {
		let quotes = true;
		if (data[key].indexOf('px') > -1) {
			quotes = false;
		}
		if (data[key].indexOf('(') > -1 && data[key].indexOf(')') > -1) {
			quotes = false;
		}
		if (parseFloat(data[key])) {
			quotes = false;
		}
		let stringValue;
		if (quotes) {
			stringValue = '\'' + data[key] + '\'';
		} else {
			stringValue = data[key];
		}
		variable = '$' + key.toLowerCase() + ': ' + stringValue + ';';
		newFile.push(variable);
	});
	return newFile.join('\r\n');
}

function jsonToLess(file) {
	let data = flatten(file, {
		delimiter: delimiter
	});
	let variable;
	let newFile = [];
	console.log(typeof data);
	Object.keys(data).forEach((key, value) => {
		variable = '@' + key.toLowerCase() + ': ' + value + ';';
		newFile.push(variable);
	});
	return newFile.join('\r\n');
}
/**
 * Convert the Data to specific language variables and lists
 */
function convertData(file, type) {

	let compiled;
	switch (type) {
		case 'scss':
			{
				compiled = jsonToScss(file);
				break;
			}
		case 'css':
			{
				compiled = jsonToCss(file);
				break;
			}
		case 'less':
			{
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


const targetDir = 'test/compiled';
const sep = path.sep;
const initDir = path.isAbsolute(targetDir) ? sep : '';
targetDir.split(sep).reduce((parentDir, childDir) => {
	const curDir = path.resolve(parentDir, childDir);
	if (!fs.existsSync(curDir)) {
		fs.mkdirSync(curDir);
	}

	return curDir;
}, initDir);

/**
 * Convert all files
 */

jsonFiles.forEach((file) => {

	fileTypes.forEach((type) => {

		// Write New Files
		let compiled = convertData(readData(file), type);
		fs.writeFileSync('test/compiled/compiled.' + type, compiled, function(err) {
			console.log('woops, something went wrong!');
		});

	});
});

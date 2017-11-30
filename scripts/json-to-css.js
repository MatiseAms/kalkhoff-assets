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

function stringValue(value) {
	let quotes = true;
	let noquotes = ['normal', 'regular', 'lowercase', 'uppercase', 'none', '0'];
	if (value.indexOf('px') > -1) {
		quotes = false;
	}
	if (value.indexOf('(') > -1 && value.indexOf(')') > -1) {
		quotes = false;
	}
	if (value.charAt(0) === '#') {
		quotes = false;
	}
	if (noquotes.includes(value)) {
		quotes = false;
	}
	if (parseFloat(value)) {
		quotes = false;
	}
	if (quotes) {
		return '\'' + value + '\'';
	} else {
		return value;
	}
}

function removeKeys(value) {
	return value;
}

function jsonToStyle(file, pattern) {
	let data = flatten(file, {
		delimiter: delimiter
	});
	let listData = flatten(file, {
	delimiter: delimiter, safe: true
		});
		console.log(listData);
	let variable;
	let newFile = [];
	console.log(typeof data);
	Object.keys(data).forEach((key) => {
		variable = pattern.replace('{{var}}', removeKeys(key.toLowerCase())).replace('{{value}}', stringValue(data[key]));
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
			compiled = jsonToStyle(file, '${{var}}: {{value}};');
			break;
		case 'css':
			compiled = jsonToStyle(file, '--{{var}}: {{value}};');
			break;
		case 'less':
			compiled = jsonToStyle(file, '@{{var}}: {{value}};');
			break;

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
		let fileName = file.split('/')[file.split('/').length - 1].replace('.json', '');

		fs.writeFileSync('test/compiled/' + fileName + '.' + type, compiled, function(err) {
			console.log('woops, something went wrong!');
		});

	});
});

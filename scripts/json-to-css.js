/**
 * @Author: Sil van Diepen <silvandiepen>
 * @Date:   2017-11-30T13:34:08+01:00
 * @Email:  sil@matise.nl
 * @Last modified by:   silvandiepen
 * @Last modified time: 2017-11-30T15:09:01+01:00
 * @Copyright: Matise
 */



let fs = require('fs');
let path = require('path');
let flatten = require('flat');


let delimiter = '-';
let sourceFolder = 'data';
//let fileTypes = ['scss', 'less', 'css'];
let fileTypes = [{
		type: 'scss',
		varPattern: '${{var}}: {{value}};',
		listPatternParent: '${{var}}: ({{list}});',
		listPattern: '"{{var}}":{{value}}'
	}, {
		type: 'less',
		varPattern: '@{{var}}: {{value}};',
		listPatternParent: '@{{var}}: {{list}};',
		listPattern: '{{var}}: {{value}}'
	},
	{
		type: 'css',
		varPattern: '--{{var}}: {{value}};',
		listPatternParent: '',
		listPattern: ''
	}
];


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
	return;
}

function stringValue(value) {
	if (typeof value == 'string') {
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
	} else {
		return value;
	}
}

function removeKeys(value) {
	return value.replace('-0-', '-');
}

function objToStyle(file, type) {
	let variable;
	let newFile = [];

	let data = flatten(file, {
		delimiter: delimiter
	});
	let listData = flatten(file, {
		delimiter: delimiter,
		safe: true
	});
	// Do the variables
	Object.keys(data).forEach((key) => {
		function isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
		if (!isNumber(key.split('-')[key.split('-').length - 1])) {
			variable = type.varPattern.replace('{{var}}', removeKeys(key.toLowerCase())).replace('{{value}}', stringValue(data[key]));
			newFile.push(variable);
		}
	});

	// Do the lists
	Object.keys(listData).forEach((key) => {
		if (typeof listData[key] === 'object') {
			let array = listData[key];
			let variable = key;
			let newList = [];
			let isArray = false;

			Object.keys(array).forEach((key) => {
				let listItem;
				let list = array[key];
				let tempList = [];

				//  console.log(typeof array[key], array[key])
				if (typeof array[key] === 'object') {
					Object.keys(list).forEach((key) => {
						listItem = type.listPattern.replace('{{var}}', key).replace('{{value}}', stringValue(list[key]));
						newList.push(listItem);
					});
					newFile.push(type.listPatternParent.replace('{{var}}', variable).replace('{{list}}', newList.join(', \r\n')));
				} else {
					if (typeof key === "string") {
						isArray = true;
						newList.push(array[key]);
					}
				}
			});
			if (isArray) {
				newFile.push(type.listPatternParent.replace('{{var}}', variable).replace('{{list}}', newList.join(', \r')));
			}

		}
	});

	return newFile.join('\r\n');

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
		let compiled = objToStyle(JSON.parse(fs.readFileSync(file, 'utf8')), type);
		let fileName = file.split('/')[file.split('/').length - 1].replace('.json', '');

		fs.writeFileSync('test/compiled/' + fileName + '.' + type.type, compiled, function(err) {
			console.log('woops, something went wrong!');
		});

	});
});

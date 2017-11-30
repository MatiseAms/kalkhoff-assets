let fs = require('fs');
let path = require('path');
let flatten = require('flat');


let delimiter = '-';
let sourceFolder = 'data';
//let fileTypes = ['scss', 'less', 'css'];
let fileTypes = [{
		type: 'scss',
		dest: 'scss/settings',
		varPattern: '${{var}}: {{value}};',
		listPatternParent: '${{var}}: ({{list}});',
		listPattern: '"{{var}}":{{value}}',
	}, {
		type: 'less',
		dest: 'less/settings',
		varPattern: '@{{var}}: {{value}};',
		listPatternParent: '@{{var}}: {{list}};',
		listPattern: '{{var}}: {{value}}'
	},
	{
		type: 'css',
		dest: 'css/settings',
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
//	console.log(files_);
	return files_;
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

				//  console.log(typeof array[key], array[key])
				if (typeof array[key] === 'object') {
					Object.keys(list).forEach((key) => {
						listItem = type.listPattern.replace('{{var}}', key).replace('{{value}}', stringValue(list[key]));
						newList.push(listItem);
					});
					newFile.push(type.listPatternParent.replace('{{var}}', variable).replace('{{list}}', newList.join(', \r\n')));
				} else {
					if (typeof key === 'string') {
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
function makeDirs() {
	fileTypes.forEach((type) => {
		const sep = path.sep;
		const initDir = path.isAbsolute(type.dest) ? sep : '';
		type.dest.split(sep).reduce((parentDir, childDir) => {
			const curDir = path.resolve(parentDir, childDir);
			if (!fs.existsSync(curDir)) {
				fs.mkdirSync(curDir);
			}
			return curDir;
		}, initDir);
	});
}
makeDirs();

/**
 * Convert all files
 */
getFiles(sourceFolder).forEach((file) => {
  let fileName = file.split('/')[file.split('/').length - 1].replace('.json', '');
  console.log('\x1b[33m%s\x1b[0m',fileName);

	fileTypes.forEach((type) => {
		// Write New Files
		let compiled = objToStyle(JSON.parse(fs.readFileSync(file, 'utf8')), type);

    console.log('\x1b[32m%s\x1b[0m','\t\u2713',type.type);
    console.log('\x1b[32m%s\x1b[0m','\t'+ file + ' \u2192 ' + type.dest + '/' + fileName + '.' + type.type);

		fs.writeFileSync(type.dest + '/' + fileName + '.' + type.type, compiled, function(err) {
			console.log('woops, something went wrong!');
		});
	});
});
let fs = require('fs');

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
	return files_;
}

let scssFiles = getFiles('scss');
let lessFiles = getFiles('less');

console.log('LESS folder is missing the following files:');
scssFiles.forEach((file) => {
	let lessPath = file.replace(/scss/g, 'less');
	if (lessFiles.indexOf(lessPath) < 0) {
		console.log('-', lessPath);
	}

});

console.log('SCSS folder is missing the following files:');
lessFiles.forEach((file) => {
	let scssPath = file.replace(/less/g, 'scss');
	if (scssFiles.indexOf(scssPath) < 0) {
		console.log('-', scssPath);
	}

});


//npm run cssvalidationdev
//npm run cssvalidation

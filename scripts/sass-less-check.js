
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

let scssFiles = getFiles('style/scss');
let lessFiles = getFiles('style/less');

let differentLess = [];
let differentScss = [];

scssFiles.forEach((file) => {
	let lessPath = file.replace(/scss/g, 'less');
	if (lessFiles.indexOf(lessPath) < 0) {
		differentLess.push(lessPath);
	}
});

lessFiles.forEach((file) => {
	let scssPath = file.replace(/less/g, 'scss');
	if (scssFiles.indexOf(scssPath) < 0) {
		differentScss.push(scssPath);
	}
});


// Log it like it's hot!
if(differentLess.length > 0){
	console.log('\x1b[33m%s\x1b[0m','\u26a0','LESS folder is missing the following files:');
	differentLess.forEach(function(file){
		console.log('\x1b[33m%s\x1b[0m','- '+ file);
	});
} else {
	console.log('\x1b[32m%s\x1b[0m','\u2713','LESS is up to date');
}

if(differentScss.length > 0){
	console.log('\x1b[33m%s\x1b[0m','\u26a0','SCSS folder is missing the following files:');
	differentScss.forEach(function(file){
		console.log('\x1b[33m%s\x1b[0m','- '+ file);
	});
} else {
	console.log('\x1b[32m%s\x1b[0m','\u2713','Scss is up to date');
}

if(differentScss.length < 1 && differentLess.length < 1){
	console.log('\x1b[32m%s\x1b[0m','\u2713','Oh yeahh...  File structure is the same.');
}

//npm run check-dev
//npm run check

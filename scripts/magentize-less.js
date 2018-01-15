let fs = require('fs');
let path = require('path');

let sourceFolder = 'magento-dist/view/frontend/web/css/less/';

const processFile = function(file, callback) {

	let mediaCommon = '& when (@media-common = true) {\n';
	fs.readFile(file, 'utf-8', function read(err, fileData) {
		if (err) {
			throw err;
		}
		if (fileData.substring(0, 15) === '//@media-common') {
			//	console.log('woooohoooooooo');
		}
		if (fs.statSync(file).size > 10 && fileData.substring(0, 15) === '//@media-common') {
			fileData = mediaCommon + fileData + '\n}';
			callback(file, fileData);
		}
		if (fs.statSync(file).size > 10 && fileData.substring(0, 15) === '// @media-common') {
			fileData = mediaCommon + fileData + '\n}';
			callback(file, fileData);
		}
	});
};

const walk = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			file = path.resolve(dir, file);
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						results = results.concat(res);
						if (!--pending) done(null, results);
					});
				} else {
					results.push(file);
					if (!--pending) done(null, results);
				}
			});
		});
	});
};

const writeFile = function(file, fileData) {
	fs.writeFileSync(file, fileData, function(err) {
		console.log('woops, something went wrong!' + err);
	});
}


walk(sourceFolder, function(err, results) {
	// throw error if something is wrong
	if (err) throw err;
	// throw error if something is wrong
	results.forEach(function(file) {
		processFile(file, writeFile);
	});
});
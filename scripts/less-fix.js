let fs = require('fs');
let path = require('path');

let sourceFile = 'magento-dist/view/frontend/web/css/assets-dist.less';

const processFile = function(file, callback) {

	fs.readFile(file, 'utf-8', function read(err, fileData) {
		if (err) {
			throw err;
		}
		writeFile(file, replaceCalc(fileData));
	});
};


//const replaceCalc = function(fileData, callback) {
const replaceCalc = function(fileData) {
	let fileDataProcessed = fileData.replace(/(?:calc\((?:.*)\/)/g, '$1, hoi');
	return fileDataProcessed;
}

const writeFile = function(file, fileData) {
	let processedFileData = replaceCalc(fileData);
	fs.writeFileSync(file, processedFileData, function(err) {
		console.log('woops, something went wrong!' + err);
	});
}
processFile(sourceFile);
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

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}


//const replaceCalc = function(fileData, callback) {
const replaceCalc = function(fileData) {
	//	let fileDataProcessed = fileData.replace(new RegExp('/(?:calc\((?:.*)\)/', 'gi'), "~\"calc($1)\"");
	// let fileDataProcessed = fileData.replace(/(?:calc\()(?:.*)(?:\))/gi, "~\"calc($1)\"");
	let fileDataProcessed = fileData.replace(/(?:calc\((?:.*)\/)/g, '$1, hoi');


	console.log(fileDataProcessed);
	return fileDataProcessed;
}

const writeFile = function(file, fileData) {
	let processedFileData = replaceCalc(fileData);
	fs.writeFileSync(file, processedFileData, function(err) {
		console.log('woops, something went wrong!' + err);
	});
}


//processFile(file, writeFile);
processFile(sourceFile);
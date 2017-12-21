let grunt = require('grunt');

function config() {
	let allConfigs = {};
	let fonts = [];
	let srcFolder = './src/icons/*';

	grunt.file.expand(srcFolder).forEach(function(fontDirFull, index) {
		let fontDirArray = fontDirFull.split('/');
		let fontDir = fontDirArray[fontDirArray.length - 1];

		let fontWeights = [];

		let codepoint = parseInt('0x' + String.fromCharCode(97 + index) + '1001');

		grunt.file.expand(fontDirFull + '/*').forEach(function(dirFull) {
			let dirArray = dirFull.split('/');
			let dir = dirArray[dirArray.length - 1];
			if (parseInt(dir)) {
				fontWeights.push(dir);
			}
		});

		function getOptions(fileName, weights = []) {
			return {
				stylesheet: 'scss',
				template: '<%= config.src.icons %>_templates/iconFile.scss',
				relativeFontPath: '',
				font: fontDir,
				fontFilename: fileName,
				startCodepoint: codepoint,
				types: 'eot,woff,ttf,svg,woff2',
				htmlDemo: false,
				templateOptions: {
					weights: weights,
					baseClass: fontDir,
					classPrefix: fontDir + '-'
				},
				customOutputs: [{
					template: '<%= config.src.icons %>_templates/iconFile.less',
					dest: '<%= config.dist.less %>icons/' + fontDir + '.less'
				}, {
					template: '<%= config.src.icons %>_templates/iconFile.jsontmpl',
					dest: '<%= config.dist.root %>icons/' + fontDir + '.json'
				}]
			};
		}

		// Create fonts with Font Weights
		if (fontWeights.length > 0) {
			fontWeights.forEach(function(weight) {
				fonts.push(fontDir + '-' + weight);
				allConfigs[fontDir + '-' + weight] = {
					src: fontDirFull + '/' + weight + '/*.svg',
					dest: '<%= config.dist.fonts %>',
					destCss: '<%= config.dist.scss %>icons/',
					options: getOptions(fontDir + '-' + weight, fontWeights)
				};
			});
		} else {
			fonts.push(fontDir);
			allConfigs[fontDir] = {
				src: fontDirFull + '/*.svg',
				dest: '<%= config.dist.fonts %>',
				destCss: '<%= config.dist.scss %>icons/',
				options: getOptions(fontDir)
			};
		}
	});

	return allConfigs;
}

module.exports = config();

let grunt = require('grunt');

function log(log) {
	grunt.log.write(`\n${log}\n\n`);
}

function config() {
	let allConfigs = {};
	let fonts = [];
	grunt.file.expand('./src/icons/*').forEach(function(fontDirFull, index) {
		let fontDirArray = fontDirFull.split('/');
		let fontDir = fontDirArray[fontDirArray.length - 1];
		let fontWeights = [];

		if (fontDir.charAt(0) === '_') {
			return;
		}

		grunt.file.expand(fontDirFull + '/*').forEach(function(dirFull) {
			let dirArray = dirFull.split('/');
			let dir = dirArray[dirArray.length - 1];
			if (parseInt(dir)) {
				fontWeights.push(dir);
			}
		});

		if (fontWeights.length > 0) {
			fontWeights.forEach(function(weight) {
				let codepoint = parseInt('0x' + String.fromCharCode(97 + index) + '1001');
				fonts.push(fontDir + '-' + weight);
				allConfigs[fontDir + '-' + weight] = {
					src: fontDirFull + '/' + weight + '/*.svg',
					dest: '<%= config.dist.fonts %>',
					destCss: '<%= config.dist.scss %>icons/' + fontDir + '-' + weight,
					options: {
						stylesheet: 'scss',
						template: '<%= config.src.icons %>_templates/iconFile.scss',
						relativeFontPath: '',
						fontFilename: fontDir + '-' + weight,
						startCodepoint: codepoint,
						types: 'eot,woff,ttf,svg,woff2',
						htmlDemo: false,
						templateOptions: {
							baseClass: fontDir,
							classPrefix: fontDir + '-'
						},
						customOutputs: [{
							template: '<%= config.src.icons %>_templates/iconFile.less',
							dest: '<%= config.dist.less %>icons/' + fontDir + '-' + weight + '/icons.less'
						}, {
							template: '<%= config.src.icons %>_templates/iconFile.jsontmpl',
							dest: '<%= config.dist.root %>icons/' + fontDir + '-' + weight + '/icons.json'
						}]
					}
				};
			});
		} else {
			let codepoint = parseInt('0x' + String.fromCharCode(97 + index) + '1001');
			fonts.push(fontDir);
			allConfigs[fontDir] = {
				src: fontDirFull + '/*.svg',
				dest: '<%= config.dist.fonts %>',
				destCss: '<%= config.dist.scss %>icons/' + fontDir,
				options: {
					stylesheet: 'scss',
					template: '<%= config.src.icons %>_templates/iconFile.scss',
					relativeFontPath: '',
					fontFilename: fontDir,
					startCodepoint: codepoint,
					types: 'eot,woff,ttf,svg,woff2',
					htmlDemo: false,
					templateOptions: {
						baseClass: fontDir,
						classPrefix: fontDir + '-'
					},
					customOutputs: [{
						template: '<%= config.src.icons %>_templates/iconFile.less',
						dest: '<%= config.dist.less %>icons/' + fontDir + '/icons.less'
					}, {
						template: '<%= config.src.icons %>_templates/iconFile.jsontmpl',
						dest: '<%= config.dist.root %>icons/' + fontDir + '/icons.json'
					}]
				}
			};
		}
	});
	importFile(fonts);
	return allConfigs;
}

function importFile(fonts) {
	let options = {
		template: './src/icons/_templates/importFile.scss',
		dest: './dist/scss/icons/_all.scss',
		templateOptions: {
			fonts: fonts,
			test: 'testje'
		}
	};
	log(fonts);
	let imports = grunt.template.process(
		grunt.file.read(options.template), {
			data: options.templateOptions
		}
	);
	grunt.file.write(options.dest, imports);
}

module.exports = config();

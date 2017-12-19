let grunt = require('grunt');

function log(log) {
	grunt.log.write(`\n${log}\n\n`);
}

function config() {
	let allConfigs = {};
	let fonts = [];
	let iconlist = [];
	let srcFolder = './src/icons/*';
	let total = grunt.file.expand(srcFolder).length;
	let i = 0;

	grunt.file.expand(srcFolder).forEach(function(fontDirFull, index) {
		i++;
		let fontDirArray = fontDirFull.split('/');
		let fontDir = fontDirArray[fontDirArray.length - 1];
		let fontWeights = [];
		let subtotal = grunt.file.expand(fontDirFull + '/*').length;
		let a = 0;
		let lastfont = '';
		let codepoint = parseInt('0x' + String.fromCharCode(97 + index) + '1001');

		grunt.file.expand(fontDirFull + '/*').forEach(function(dirFull) {
			let dirArray = dirFull.split('/');
			let dir = dirArray[dirArray.length - 1];
			if (parseInt(dir)) {
				fontWeights.push(dir);
			}
		});

		let baseOptions = {
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
			}],
			callback: function(filename, types, glyphs) {
				if (lastfont !== filename) {
					//	log(typeof glyphs);
					iconlist[filename] = Object.keys(glyphs).map(function(key) {
						return glyphs[key];
					});
					//	log(iconlist[filename]);
					lastfont = filename;
					makeList(i, total, iconlist);
				}
			}
		};
		// Create fonts with Font Weights
		if (fontWeights.length > 0) {
			fontWeights.forEach(function(weight) {
				a++;
				fonts.push(fontDir + '-' + weight);
				allConfigs[fontDir + '-' + weight] = {
					src: fontDirFull + '/' + weight + '/*.svg',
					dest: '<%= config.dist.fonts %>',
					destCss: '<%= config.dist.scss %>icons/' + fontDir + '-' + weight,
					options: baseOptions
				};
			});
		}
		// Create fonts from folders
		else {
			fonts.push(fontDir);
			allConfigs[fontDir] = {
				src: fontDirFull + '/*.svg',
				dest: '<%= config.dist.fonts %>',
				destCss: '<%= config.dist.scss %>icons/' + fontDir,
				options: baseOptions
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
	let imports = grunt.template.process(
		grunt.file.read(options.template), {
			data: options.templateOptions
		}
	);
	grunt.file.write(options.dest, imports);
}

function makeList(i, total, icons) {
	if (i === total) {
		let options = {
			template: './src/icons/_templates/iconList.json',
			dest: './src/settings/icons.json',
			templateOptions: {
				icons: icons
			}
		};
		let imports = grunt.template.process(
			grunt.file.read(options.template), {
				data: options.templateOptions
			}
		);
		grunt.file.write(options.dest, imports);
	}
}

module.exports = config();
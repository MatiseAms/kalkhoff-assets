var grunt = require('grunt');

// function log(log) {
// 	grunt.log.write(log);
// }

function config() {
	var allConfigs = {};
	var fonts = [];
	grunt.file.expand('./src/icons/*').forEach(function(dirFull, index) {
		var dirArray = dirFull.split('/');

		var dir = dirArray[dirArray.length - 1];

		var codepoint = parseInt('0x' + String.fromCharCode(97 + index) + '1001');
		if (dir.charAt(0) !== '_') {
			fonts.push(dir);
			allConfigs[dir] = {
				src: dirFull + '/*.svg',
				dest: '<%= config.dist.fonts %>',
				destCss: '<%= config.dist.scss %>icons/' + dir,
				options: {
					stylesheet: 'scss',
					template: '<%= config.src.icons %>_templates/iconFile.scss',
					relativeFontPath: '',
					fontFilename: dir,
					startCodepoint: codepoint,
					types: 'eot,woff,ttf,svg,woff2',
					htmlDemo: false,
					templateOptions: {
						baseClass: dir,
						classPrefix: dir + '-'
					},
					customOutputs: [{
						template: '<%= config.src.icons %>_templates/iconFile.less',
						dest: '<%= config.dist.less %>icons/' + dir + '/icons.less'
					}, {
						template: '<%= config.src.icons %>_templates/iconFile.jsontmpl',
						dest: '<%= config.dist.root %>icons/' + dir + '/icons.json'
					}]
				}
			};
		}
	});
	importFile(fonts);
	return allConfigs;
}

function importFile(fonts) {
	var options = {
		template: './src/icons/_templates/importFile.scss',
		dest: './dist/scss/icons/_all.scss',
		templateOptions: {
			fonts: fonts,
			test: 'testje'
		}
	};
	var imports = grunt.template.process(
		grunt.file.read(options.template), {
			data: options.templateOptions
		}
	);
	grunt.file.write(options.dest, imports);
}

module.exports = config();

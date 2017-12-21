module.exports = {
	less: {
		files: [{
			expand: true,
			cwd: '<%= config.src.root %>',
			src: [
				'**/*.less',
				'!icons/_templates/*'
			],
			dest: '<%= config.dist.root %>'
		}]
	},
	scss: {
		files: [{
			expand: true,
			cwd: '<%= config.src.root %>',
			src: [
				'**/*.scss',
				'!icons/_templates/*'
			],
			dest: '<%= config.dist.root %>'
		}]
	},
	fonts: {
		files: [{
			expand: true,
			cwd: '<%= config.src.fonts %>',
			src: [
				'*.eot',
				'*.ttf',
				'*.otf',
				'*.svg',
				'*.woff'
			],
			dest: '<%= config.dist.root %>fonts/'
		}]
	},
	json: {
		files: [{
			expand: true,
			cwd: '<%= config.src.root %>',
			src: [
				'settings/*.json'
			],
			dest: '<%= config.dist.root %>'
		}]
	}
};

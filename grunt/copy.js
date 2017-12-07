module.exports = {
	less: {
		files: [{
			expand: true,
			cwd: '<%= config.src.root %>',
			src: [
				'**/*.less',
			],
			dest: '<%= config.dist.root %>'
		}]
	},
	sass: {
		files: [{
			expand: true,
			cwd: '<%= config.src.root %>',
			src: [
				'**/*.scss',
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
	}
};

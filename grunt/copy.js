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
				'settings/*.json',
				'settings/*.js'
			],
			dest: '<%= config.dist.root %>'
		}]
	},
	images: {
		files: [{
			expand: true,
			cwd: '<%= config.src.root %>',
			src: [
				'images/*.png',
				'images/*.jpg',
				'images/*.gif',
				'images/*.svg'
			],
			dest: '<%= config.dist.root %>images/'
		}]
	},
	magento_component: {
		files: [{
			expand: true,
			cwd: '<%= config.dist.root %>',
			src: [
				'**/*',
				'!**/*.scss',
				'!**/scss',
				'!view'
			],
			dest: '<%= config.magento.component %>'
		}]
	},
	magento_files: {
		files: [{
			expand: true,
			cwd: '<%= config.src.root %>',
			src: [
				'registration.php',
				'etc/*',
			],
			dest: '<%= config.dist.root %>'
		}]
	}
};
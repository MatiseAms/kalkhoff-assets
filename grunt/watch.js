module.exports = {
	options: {
		spawn: false
	},
	src: {
		files: '<%= config.src.root %>**/*',
		tasks: ['build']
	}
};

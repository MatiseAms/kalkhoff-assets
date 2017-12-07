module.exports = {
	default: {
		options: {
			sourcemap: true,
			outputStyle: 'expanded'
		},
		files: {
			'<%= config.test.sass %>assets.css': '<%= config.dist.root %>assets.scss',
			'<%= config.test.sass %>assets-classes.css': '<%= config.dist.root %>assets-classes.scss'
		}
	}
};

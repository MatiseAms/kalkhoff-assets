module.exports = {
	test: {
		files: {
			'<%= config.test.scss %>assets.css': '<%= config.dist.root %>assets.scss',
			'<%= config.test.scss %>assets-classes.css': '<%= config.dist.root %>assets-classes.scss'
		}
	},
	compile: {
		files: {
			'<%= config.test.scss %>compiled2.css': '<%= config.dist.root %>compile.scss'
		}
	}
};
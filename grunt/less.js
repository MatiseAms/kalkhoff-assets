module.exports = {
	test: {
		files: {
			'<%= config.test.less %>assets.css': '<%= config.dist.root %>assets.less',
			'<%= config.test.less %>assets-classes.css': '<%= config.dist.root %>assets-classes.less'
		}
	},
	dist: {
		files: {
			'<%= config.magento.component %>assets-dist.less': '<%= config.dist.root %>assets-classes.less'
		}
	}
}
module.exports = {
	build: [
		'<%= config.dist.root %>images/',
		'<%= config.dist.root %>less/*/',
		'!<%= config.dist.root %>less/icons/',
		'<%= config.dist.root %>scss/*/',
		'!<%= config.dist.root %>scss/icons/',
		'<%= config.dist.root %>settings/',
		'<%= config.dist.root %>*.less',
		'<%= config.dist.root %>*.scss'
	],
	magento: [
		'<%= config.magento.component %>'
	],
	test: [
		'<%= config.test.root %>'
	]
};

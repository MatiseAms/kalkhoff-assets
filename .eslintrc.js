module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: "module"
	},
	env: {
		es6: true,
		browser: true,
		node: true
	},
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	rules: {
		'no-mixed-spaces-and-tabs': 0,
		'no-tabs': 0,
		'indent': ['warn', 'tab'],
		'space-before-function-paren': 0,
		'no-unused-vars': ['warn'],
		'semi': 0,
		'space-before-blocks': 0,
		'eol-last': 0,
		'space-unary-ops': 0
	},
	globals: {}
};
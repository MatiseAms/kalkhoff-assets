module.exports = {
	generate_settings: {
		command: 'node scripts/json-to-css.js'
	},
	check_src: {
		command: 'node scripts/scss-less-check.js'
	},
	compile_less: {
		command: 'php scripts/less.php'
	}
};

# kalkhoff-assets

"test": "npm run build-sass && npm run build-less",

	"build-sass": "npm run sass-extend && npm run sass-classes",
		"sass-extend": "node-sass --output-style expanded --source-map true assets.scss test/sass-css/assets.css",
		"sass-classes": "node-sass --output-style expanded --source-map true assets-classes.scss test/sass-css/assets-classes.css",

	"build-less": "npm run less-extend && npm run less-classes",
		"less-extend": "lessc assets-classes.less test/less-css/assets.css",
		"less-classes": "lessc assets-classes.less test/less-css/assets-classes.css",


"sass-less": "sass2less scss/**/*.scss 'less/**/*.less'",
"sass2less": "sass2less scss/extend/grid/_functions.scss 'less/extend/grid/_functions.less'",


"check": "node scripts/sass-less-check.js",

"check-dev": "nodemon scripts/sass-less-check.js",

"vars": "node scripts/json-to-css.js"

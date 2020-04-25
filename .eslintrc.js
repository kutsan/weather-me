module.exports = {
	root: true,

	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},

	extends: ['eslint:recommended', 'plugin:react/recommended'],

	env: {
		node: true,
		es6: true,
		browser: true,
		jest: true
	},

	plugins: ['react'],
	settings: {
		react: { version: 'detect' }
	},

	rules: {
		indent: ['warn', 'tab', { SwitchCase: 1 }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['off', 'single'],
		semi: ['off', 'always'],
		'no-console': 0,
		'react/display-name': 0,
		'react/prop-types': 1
	}
}

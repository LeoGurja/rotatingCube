module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard'
	],
	plugins: [
	  'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'space-before-function-paren': ['error', 'never']
  }
}

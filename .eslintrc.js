module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'plugin:prettier/recommended', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
	],
	parserOptions: {
		ecmaVersion: 2018, // 최신 문법 지원
		sourceType: 'module', // 모듈 시스템 사용시
	},
	rules: {
		// indent: ['error', 2], 누구는 eslint-config-prettier 충돌을 막는다는데 indent의 경우는 그냥 rule를 꺼버리는게 나아요. 계속 충돌되요 fix eslint <-> fix prettier
		// extends에서 적용한 룰셋을 덮어씌울 수 있습니다.
		// '@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				semi: false,
			},
		],
	},
	settings: {},
}

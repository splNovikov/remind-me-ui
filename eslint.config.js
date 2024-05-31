import { config as defaultConfig } from '@epic-web/config/eslint';

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	{
		rules: {
			semi: 'error',
			'import/consistent-type-specifier-style': 'off',
		},
	},
];

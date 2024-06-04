import defaultConfig from '@epic-web/config/prettier';

/** @type {import("prettier").Options} */
export default {
	...defaultConfig,
	semi: true,

	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: [
		'^(node:)',
		'<THIRD_PARTY_MODULES>',
		'^(#/app|#/shared)(/.*)$',
		'^[./]',
	],
	importOrderSeparation: true,
};

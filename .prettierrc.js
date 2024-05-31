import defaultConfig from '@epic-web/config/prettier';

/** @type {import("prettier").Options} */
export default {
	...defaultConfig,
	semi: true,
	plugins: ['prettier-plugin-organize-imports'],
};

import { type Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';
import radixPlugin from 'tailwindcss-radix';

import { marketingPreset } from './app/routes/_marketing+/tailwind-preset';
import { extendedTheme } from './shared/lib/extended-theme.ts';

export default {
	content: ['./app/**/*.{ts,tsx}', './shared/**/*.{ts,tsx}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: extendedTheme,
	},
	presets: [marketingPreset],
	plugins: [animatePlugin, radixPlugin],
} satisfies Config;
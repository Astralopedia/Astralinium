import type { Config } from 'tailwindcss'
const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				shimmer: 'shimmer 2s linear infinite',
			},
			keyframes: {
				shimmer: {
					from: {
						backgroundPosition: '0 0',
					},
					to: {
						backgroundPosition: '-200% 0',
					},
				},
			},
		},
	},
	plugins: [
		require('daisyui'),
		addVariablesForColors,
		iconsPlugin({
			collections: getIconCollections(['fa6-brands']),
		}),
	],
}

export default config

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
	)

	addBase({
		':root': newVars,
	})
}

import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	prefix: 'orderly-',
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-gunmetal': 'linear-gradient(0deg, #1b1d22 0, #26292e 100%)',
			},
			backgroundColor: {
				gunmetal: '#131519',
				richBlack: '#07080A',
				paleLime: '#E1F578',
				lightPurple: '#ac93db',
				charcoalGray: '#181c23',
				charcoalBlue: '#282E3A',
				blueGray: '#333948',
				brightBlue: '#335ffc3',
				charcoal: '#34394A',
				slateGray: '#676A72',
				eerieBlack: '#1E2025',
				darkGunmetal: '#1b2028',
				darkBronze: '#765821',
			},
			colors: {
				paleLime: '#E1F578',
				lightPurple: '#ac93db',
				translucent: '#FFFFFF8A',
				translucentWhite: '#ffffff5c',
				lightGoldenrod: '#FFCF73',
			},
			borderColor: {
				semiTransparentWhite: '#ffffff1f',
				lightGoldenrod: '#FFCF73',
			},
		},
	},
	plugins: [],
};

export default config;

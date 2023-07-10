/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'main-bg': 'linear-gradient(to right, #0575e6, #021b79);',
			},
		},
	},
	plugins: [],
};

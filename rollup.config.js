import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';

export default [
    {
		input: pkg.main,
		external: ['ms'],
		output: [
			{ file: pkg.common, format: 'cjs', plugins: [terser()] },
			{ file: pkg.module, format: 'es', plugins: [terser()] }
		]
	}
]
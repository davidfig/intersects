import { terser } from 'rollup-plugin-terser'

export default [
    {
        input: 'src/main.js',
        output:
        {
            file: 'umd/intersects.js',
            plugins: [terser()],
            format: 'umd',
            name: 'intersects',
            esModule: false
        }
    },
    {
        input: 'src/main.js',
        output:
        {
            file: 'esm/index.js',
            format: 'esm'
        }
    }
]
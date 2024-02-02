import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input: './src/index.js',
    output: {
        file: 'dist/vue.js',
        format: 'umd', // 打包以后可以把vue挂载到全局
        name: 'Vue', // 搭配format一起使用
        sourcemap: true, //
    },
    plugins: [
        babel({
            // exclude: "node_modules/**" 
            // include: "" 
        }),
        serve({
            port: 3000,
            contentBase: '',  // '' -》当前目录
            openPage: './index.html'
        })
    ]
}
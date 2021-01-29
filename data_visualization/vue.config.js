const path = require('path');
module.exports = {
    //基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    //输出文件路径
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存时检查
    lintOnSave: false,
    /**
     *  webpack配置， see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     */
    chainWebpack: (config) => {
        const svgRule = config.module.rule("svg");
        svgRule.uses.clear();
        svgRule
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
                include: ["./src/icons"]
            });
    },
    configureWebpack: (config) => {
        config.resolve = {
            extensions:['.js', '.json', '.vue'],
            alias:{
                'vue': 'vue/dist/vue.js',
                '@': path.resolve(__dirname, './src'),
                'public': path.resolve(__dirname, './public'),
                'components': path.resolve(__dirname, './src/components'),
                'common': path.resolve(__dirname, './src/common'),
                'api': path.resolve(__dirname, './src/api'),
                'views': path.resolve(__dirname, './src/views'),
                'data': path.resolve(__dirname, './src/data')
            }
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap:false,
    // css相关配置
    css: {
        //是否使用css分离插件 ExtractTextPlugin
        extract: true,
        //开启css source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions:{
            sass: {
                prependData: '@import "./src/styles/main.scss";'
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true
    },
    // use thread-loader for babel & TS in production build
    // enable by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    /**
     *  PWA 插件相关配置， see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
     */
    pwa:{},
    // webpack-dev-server 相关配置
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hot: true,
        hotOnly: false,
        proxy: {
            'test':{
                target: "http://localhost:8080/test",
                changeOrigin: true,
                pathRewrite: {
                    '^/test': ''
                }
            }
        },
        overlay:{
            warnings: true,
            errors: true
        },
        before:app => {

        }
    },
    /**
     *  第三方插件配置
     */
    pluginOptions:{}
}
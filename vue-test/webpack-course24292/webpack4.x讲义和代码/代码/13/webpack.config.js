/*
    webpack配置文件，每次执行会自动读取这里的配置
 */

//路径
const path = require('path')
//html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
//css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//css压缩插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    //出口文件
    entry: './src/index.js',

    //出口文件
    output: {
        //文件名
        filename: "assets/js/bundle.js",
        //路径，绝对路径
        path : path.resolve(__dirname, './dist')
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    //模块
    module: {
        //规则
        rules: [
            {
                test: /\.css$/,
                //执行顺序是从右往左边
                use : [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath : '../'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders : 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test : /\.less$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test : /\.scss$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit : 10240,
                    name : '[name].[ext]',
                    outputPath : 'assets/img'
                }
            },
            {
                test : /\.html$/,
                use : ['html-loader']
            },
            {
                test : /\.js$/,
                loader : 'babel-loader',
                options: {
                    presets : [
                        '@babel/preset-env'
                    ],
                    plugins : [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            },
            {
                test : /\.ts$/,
                use : ['ts-loader']
            },
            // {
            //     test : /\.js$/,
            //     loader : 'eslint-loader',
            //     //编译前执行
            //     enforce: 'pre',
            //     //不检查指定目录
            //     exclude: /node_modules/
            // }
        ]
    },

    //devServer
    devServer: {
        port : 3000,
        stats : 'minimal',
    },

    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",        //默认
            filename: "index.html",
            minify: {
                collapseWhitespace : false,          //去掉空格
                removeComments : false,              //去掉注释
            }
        }),
        new MiniCssExtractPlugin({
            filename : 'assets/css/[name].css'
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],

    //devTool
    devtool: 'inline-source-map',

    //生成模式
    mode : "development"
};
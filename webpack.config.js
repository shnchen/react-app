const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Webpackbar = require('webpackbar');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCassAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
    resolve:{
        alias:{
            "@": path.resolve(__dirname,'src')
        },
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options: {
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    // 这里一定要使用MiniCssExtractPlugin.loader才能达到抽离css的效果
                     'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    }
                    ],
            }, 
            {
                test: /\.less$/,
                use:['style-loader', 'css-loader','less-loader'],
            },
            {
                test:/\.(jpe?g|png|svg|gif)$/,
                use:['url-loader']
            }
        ]
    },
    plugins:[
        //打包之后自动生成index.html
        new HtmlWebPackPlugin({
            template:'./src/index.html'
        }),
        //打包之前自动删除上一次打的包
        new CleanWebpackPlugin(),
        //打包进度条
        new Webpackbar(),
        //抽离css
        // new MiniCssExtractPlugin({
        //     filename:"css/[name].css",
        //     chunkFilename: "[id].css"
        // }),
        //压缩css
        new OptimizeCassAssetsPlugin(),
        //压缩js
        new TerserPlugin(),
        new CompressionWebpackPlugin()
       
    ],
    devServer:{
        historyApiFallback:true,
        port:8089,
        host:'dev-test.gaodun.com',
    }
}
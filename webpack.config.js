const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{loader:'babel-loader'}
            },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            }, 
            {
                test: /\.less$/,
                use:['style-loader','css-loader','less-loader']
            }, 
            {
                test: /\.jpeg$/,
                use:['url-loader']
            },
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:'./src/index.html'
        })
    ],
    devServer:{
        historyApiFallback:true
    }
}
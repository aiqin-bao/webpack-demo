const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const DEV = process.env.NODE_ENV == 'dev'

const resolve = (name) => {
    return  path.resolve( __dirname, name);
}


module.exports = {
    entry:  './app/index.js',
    output: {
        path: resolve('build'),
        filename:'js/[hash]bundle.js',
      },
    devServer: {
        contentBase: './build/index.min.html',
        port: 8008,
        historyApiFallback: true,
        inline: true,
        hot: true
    },

    module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'babel-loader',
          css: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: ['css-loader']
          }),
          sass: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
        transformToRequire: {
          source: 'src'
        },
        preserveWhitespace: false //trim
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|ico)$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: 'static/image/[hash:8].[ext]'
      }
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader']
      })
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.mp3(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/media/[hash:8].[ext]'
      }
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader',
      options: {
        name: 'static/fonts/[name].[hash:8].[ext]'
      }
    }]
  },
    plugins: [
        new ExtractTextPlugin({
              filename: 'style/main.[chunkhash:8].css',
              allChunks: true
        }),
        new HtmlWebpackPlugin({
            template:'index.html',//模板html
            filename:'index.html'//打包之后的html
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin ({
            url: 'http://localhost:8008'
        })
    ]
}

/*
* @Author: v_yinggzhou
* @Date:   2018-02-02 10:42:24
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2018-02-05 19:29:04
*/
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
// 判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web',
	entry: path.join(__dirname, 'src/index.js'),// 输入
	output: {// 输出
		filename: 'bundle.[hash:8].js',// 文件名
		path: path.join(__dirname, 'dist')// 输出路径
	},
	module: {
		rules: [{// Vue文件的处理
			test: /\.vue$/,// 匹配规则
			loader: 'vue-loader'// 处理.vue的文件
		}, {// jsx语法的支持
			test: /\.jsx$/,
			loader: 'babel-loader'
		}, {// 图片处理
			test: /\.(gif|jpg|jpeg|png|svg)$/,
			use: [{
				loader: 'url-loader',// 小于1024的图片可以直接转换成base64代码
				options: {
					limit: 1024,
					name: '[name]-zy.[ext]'// 保留原来的名字以及扩展名 
				}
			}]
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),// 将NODE_ENV配置到全局变量中
		new HTMLPlugin()// 使用HTMLPlugin插件生成一个html文件
	]
}

if(isDev){// 开发配置
	config.module.rules.push({// css预处理器
		test: /\.styl$/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true,// postcss-loader可以复用前面的sourcemap
				}
			},
			'stylus-loader'// 针对stylus文件做处理
		]
	})
	config.devtool = '#cheap-module-eval-source-map'// 便于调试
	config.devServer = {
		port: 8000, // 监听的端口
		host: '0.0.0.0', // 127.0.0.1和本地内网IP都可以访问
		overlay: {// 在webpack进行编译的过程中，如果有任何的错误，都显示到网页上
			errors: true,
		},
		hot: true// 热加载
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
}else{// 正式环境配置
	config.entry = {
		app: path.join(__dirname, 'src/index.js'),
		vendor: ['vue']
	}
	// 正式环境要使用chunkhash
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push({
		test: /\.styl$/,
		use: ExtractPlugin.extract({
			fallback: 'style-loader',
			use: [
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,// postcss-loader可以复用前面的sourcemap
					}
				},
				'stylus-loader'// 针对stylus文件做处理
			]
		})
	})
	config.plugins.push(
		new ExtractPlugin('styles.[contentHash:8].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		})
	)
}

module.exports = config
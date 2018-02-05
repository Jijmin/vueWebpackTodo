/*
* @Author: v_yinggzhou
* @Date:   2018-02-02 10:42:24
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2018-02-05 10:56:23
*/
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web',
	entry: path.join(__dirname, 'src/index.js'),// 输入
	output: {// 输出
		filename: 'bundle.js',// 文件名
		path: path.join(__dirname, 'dist')// 输出路径
	},
	module: {
		rules: [{// Vue文件的处理
			test: /\.vue$/,// 匹配规则
			loader: 'vue-loader'// 处理.vue的文件
		}, {// jsx语法的支持
			test: /\.jsx$/,
			loader: 'babel-loader'
		}, {// css文件的处理
			test: /\.css$/,
			use: [
				'style-loader',// 将读出来的css写到style标签中
				'css-loader',//只是从css文件中将样式读取出来
			]
		}, {// css预处理器
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

// 开发配置
if(isDev){
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
}

module.exports = config
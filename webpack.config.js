/*
* @Author: v_yinggzhou
* @Date:   2018-02-02 10:42:24
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2018-02-02 14:41:55
*/
const path = require('path')

module.exports = {
	entry: path.join(__dirname, 'src/index.js'),// 输入
	output: {// 输出
		filename: 'bundle.js',// 文件名
		path: path.join(__dirname, 'dist')// 输出路径
	},
	module: {
		rules: [{// Vue文件的处理
			test: /\.vue$/,// 匹配规则
			loader: 'vue-loader'// 处理.vue的文件
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
	}
}
/*
* @Author: v_yinggzhou
* @Date:   2018-02-02 10:42:24
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2018-02-02 11:12:28
*/
const path = require('path')

module.exports = {
	entry: path.join(__dirname, 'src/index.js'),// 输入
	output: {// 输出
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader'
		}]
	}
}
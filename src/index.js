/*
* @Author: v_yinggzhou
* @Date:   2018-02-02 10:45:28
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2018-02-05 11:15:28
*/
import Vue from 'vue'
import App from './app.vue'

import './assets/style/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
	render: (h) => h(App)
}).$mount(root)
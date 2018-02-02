/*
* @Author: v_yinggzhou
* @Date:   2018-02-02 10:45:28
* @Last Modified by:   v_yinggzhou
* @Last Modified time: 2018-02-02 10:53:53
*/
import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
	render: (h) => h(App)
}).$mount(root)
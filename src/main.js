import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios

// Set data from globally defined variable
// eslint-disable-next-line
var appdata = data !== undefined ? data : { }

var vm = new Vue({
    store,
    el: '#begegnungserfassung',
    render: h => h(App)
})

/*
 * FIXME(?): Es sollte eleganter gehen, als davon auszugehen, daß wir genau ein
 * Kind-Element haben (die App-Komponente) und dann dieses zu verwenden.
 */
vm.$children[0].setData(appdata)

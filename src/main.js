import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

// Set data from globally defined variable
// eslint-disable-next-line
var appdata = data !== undefined ? data : { }

var vm = new Vue({
    el: '#begegnungserfassung',
    render: h => h(App)
})

/*
 * FIXME(?): Es sollte eleganter gehen, als davon auszugehen, daß wir genau ein
 * Kind-Element haben (die App-Komponente) und dann dieses zu verwenden.
 */
vm.$children[0].setNumSlots(appdata.numSlots)
vm.$children[0].setSpielplan(appdata.spielplan)
vm.$children[0].setHome(appdata.home)
vm.$children[0].setAway(appdata.away)
vm.$children[0].setRequestToken(appdata.requestToken)
vm.$children[0].setBegegnungId(appdata.begegnungId)
vm.$children[0].initializeData()


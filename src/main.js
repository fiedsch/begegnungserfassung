import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Set data from globally defined variable
// eslint-disable-next-line
var appdata = data !== undefined ? data : { }

var vm = new Vue({
    render: h => h(App)
}).$mount('#begegnungserfassung')

/*
 * FIXME: Es muss eleganter gehen, als davon auszugehen, daß wir genau ein Kind-Element haben (die App-Komponente) und dann dieses zu verwenden.
 */
vm.$children[0].setNumSlots(appdata.numSlots)
vm.$children[0].setSpielplan(appdata.spielplan)
vm.$children[0].setHome(appdata.home)
vm.$children[0].setAway(appdata.away)
vm.$children[0].initializeData()



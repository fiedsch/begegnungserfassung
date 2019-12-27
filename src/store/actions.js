import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// Vue.http.options.emulateJSON = true

export default {
    setData(context, data) {
        context.commit('setData', data)
    },
    setHome(context, data) {
        context.commit('setHome', data)
    },
    setAway(context, data) {
        context.commit('setAway', data)
    },
    setSpielplan(context, data) {
        context.commit('setSpielplan', data)
    },
    setSpielplanCode(context, data) {
        context.commit('setSpielplanCode', data)
    },
    setNumSlots(context, data) {
        context.commit('setNumSlots', data)
    },
    setRequestToken(context, data) {
        context.commit('setRequestToken', data)
    },
    setBegegnungId(context, data) {
        context.commit('setBegegnungId', data)
    },
    initializeData(context) {
        context.commit('initializeData')
    },

    lineupPlayerChanged(context, data) {
        context.commit('lineupPlayerChanged', data)
    },
    resultsTablePlayerChanged(context, data) {
        context.commit('resultsTablePlayerChanged', data)
    },
    setHighlight(context, data) {
        context.commit('setHighlight', data)
    },
    setHighlightsData(context, data) {
        context.commit('setHighlightsData', data)
    },
    setWebserviceUrl(context, data) {
        context.commit('setWebserviceUrl', data)
    },
    saveData(context, data) {
        let url = context.state.webserviceUrl+context.state.begegnungId;
        for (var pair of data.entries()) { console.log("%s %o", pair[0], pair[1]); }
        console.log("%o", data.entries())
        /*eslint no-unreachable: "off"*/
        // return

        Vue.http.post(url, data)
            .then(
                (result) => {
                    alert(result.data)
                }
            )
            .catch(
                (error) => {
                    alert(error.url+' : '+error.statusText) // JSON.stringify(error)
                }
            )
    },
    saveDataAndClose(context, data) {
        alert('save and close ist noch TODO')
        context.dispatch('saveData', data)
    }
}
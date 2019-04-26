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
    setIsBackendView(context, data) {
        context.commit('setIsBackendView', data)
    },
    initializeData(context) {
        context.commit('initializeData')
    }
}
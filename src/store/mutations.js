import Vue from 'vue'

function makeLineuparray(n) {
    return Array.apply(null, new Array(n)).map(() => { return 0 })
}

export default {
    setHome(state, data) {
        state.home = data
    },
    setAway(state, data) {
        state.away = data
    },
    setSpielplan(state, data) {
        state.spielplan = data
    },
    setSpielplanCode(state, data) {
        state.spielplan_code = data
    },
    setNumSlots(state, data) {
        state.numSlots = data
    },
    setRequestToken(state, data) {
        state.requestToken = data
    },
    setBegegnungId(state, data) {
        state.begegnungId = data
    },
    initializeData(state) {
        if (state.home.lineup.length === 0) {
            state.home.lineup = makeLineuparray(state.numSlots)
        }
        if (state.away.lineup.length === 0) {
            state.away.lineup = makeLineuparray(state.numSlots)
        }
        state.spielplan.forEach((entry) => {
            if (typeof entry.scores === 'undefined') {
                entry.scores = {home: null, away: null}
            }
            if (typeof entry.result === 'undefined') {
                entry.result = null;
            }
        });
        if (state.home.played.length === 0) {
            state.spielplan.forEach((entry, i) => {
                state.home.played.push({ids: entry.home, slot: i + 1})
            })
        }
        if (state.away.played.length === 0) {
            state.spielplan.forEach((entry, i) => {
                state.away.played.push({ids: entry.away, slot: i + 1})
            });
        }
    },
    lineupPlayerChanged(state, data) {
        if (data.suffix === 'H') {
            Vue.set(state.home.lineup, data.slotnumber-1, data.selected)
        } else {
            Vue.set(state.away.lineup, data.slotnumber-1, data.selected)
        }
    },
    resultsTablePlayerChanged(state, data) {
        // data ... { key: this.team.key, index: this.index, position: 0, value: value }
        console.log("resultsTablePlayerChanged: "+JSON.stringify(data))
        if (data.key === 'home') {
            //state.home.played[data.index].ids[data.position] = value;
            Vue.set(state.home.played[data.index].ids, data.position, data.value)
        } else {
            // state.away.played[data.index].ids[data.position] = value;
            Vue.set(state.away.played[data.index].ids, data.position, data.value)
        }
    },
    setHighlight(state, data) {
        Vue.set(state.highlights, data.key, data.value)
    },
    setHighlightsData(state, data) {
        Vue.set(state, 'highlights', data)
    },
    setWebserviceUrl(state, data) {
        if (!data.match(/\/$/)) { data += '/' }
        Vue.set(state, 'webserviceUrl', data)
    }
}

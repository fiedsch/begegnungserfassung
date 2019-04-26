
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
    setIsBackendView(state, data) {
        state.isBackendView = data
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
    }
}

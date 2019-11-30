let abbrev = (state, id) => {
    let search = state.home.lineup.indexOf(id)
    if (search > -1) {
        return 'H' + (search + 1)
    }
    search = state.away.lineup.indexOf(id)
    if (search > -1) {
        return 'G' + (search + 1)
    }
    return id // return only the id as fallback and an "error marker"
}

let playerDetails = (state, id, field) => {
    let search = state.home.available.filter((el) => { return el.id === id})
    if (search.length > 0) {
        return search[0][field]
    }
    search = state.away.available.filter((el) => { return el.id === id})
    if (search.length > 0) {
        return search[0][field]
    }
    return id // return only the id as fallback and an "error marker"
}



export default {
    /**
     * Alle verfügbaren Spieler
     *
     * @param state
     * @returns {{pass: number, name: *, id: *, abbrev: string}[]}
     */
    /*
    availableAll(state) {
        let alllineup = [...state.home.lineup, ...state.away.lineup]
        return [...state.home.available , ...state.away.available].filter((el) => {
            return el.id > 0 && alllineup.includes(el.id)
        })
        .map((el) => {
            return {id: el.id, name: el.name, abbrev: ""+abbrev(state, el.id), pass: el.pass};
        })
    },
    */

    /**
     * Spieler, die eingesetzt wurden (und somit potenziell Highlights geworfen haben könnten)
     * Nur für diese ist es sinnvoll, einen Eintrag in der Highlights-Liste zu erstellen.
     *
     * @param state
     * @returns {{pass: number, name: *, id: *, abbrev: string}[]}
     */
    playedAll(state) {
        let allIds = []
        state.spielplan.forEach((el) => {
            allIds.push(state.home.lineup[el.home[0]])
            allIds.push(state.away.lineup[el.away[0]])
            if (el.home.length>1) {
                allIds.push(state.home.lineup[el.home[1]])
                allIds.push(state.away.lineup[el.away[1]])
            }
        })
        // no null values, no duplicates, destinct IDs only:
        return [... new Set(allIds.filter((el) => { return el > 0 }))]
            .map((id) => {
                return {id: id, name: ""+playerDetails(state, id, 'name'), abbrev: ""+abbrev(state, id), pass: playerDetails(state, id, 'pass') };
            })

    }
}
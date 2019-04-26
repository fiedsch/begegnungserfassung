export default {
    availableAll(state) {
        let abbrev = (id) => {
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

        let alllineup = [...state.home.lineup, ...state.away.lineup]
        return [...state.home.available , ...state.away.available].filter((el) => {
            return el.id > 0 && alllineup.includes(el.id)
        })
        .map((el) => {
            return {id: el.id, name: el.name, abbrev: abbrev(el.id), pass: el.pass};
        })
    }
}
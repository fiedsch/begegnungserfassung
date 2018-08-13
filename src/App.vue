<template ref="app">
    <div>
    <form method="GET">
        <input type="hidden" name="homelineup" :value="home.lineup">
        <input type="hidden" name="awaylineup" :value="away.lineup">
        <Aufstellung
                :home="home"
                :away="away"
                :slots="numSlots"
        ></Aufstellung>
        <ResultsTable
                :home="home"
                :away="away"
                :spielplan="spielplan"
        ></ResultsTable>
        <HighlightsEntry :available="availableAll"></HighlightsEntry>
        <input type="submit" @click.prevent="showFormData">
    </form>
    <h3>Formdata</h3>
    <pre>{{ formData }}</pre>
    </div>
</template>

<script>
/**
 *
 */

import Aufstellung from './components/Aufstellung.vue'
import ResultsTable from './components/ResultsTable.vue'
import HighlightsEntry from './components/HighlightsEntry'

export default {
    name: 'app',
    components: {
        Aufstellung,
        ResultsTable,
        HighlightsEntry
    },
    data() {
        return {
            home: { key: "home", name: "", available: [ ], lineup: [ ], played: [ ] },
            away: { key: "away", name: "", available: [ ], lineup: [ ], played: [ ] },
            spielplan: [ ],
            numSlots: 0,
            formData: { test: 'initial' }
        }
    },
    computed: {
        availableAll() {
            return [...this.home.available , ...this.away.available].filter(function(el) { return el.id > 0 })
        }
    },
    methods: {
        showFormData() {
            let form = document.querySelector('form');
            let data = new FormData(form);
            this.formData = { test: Array.from(data) }
        },
        initializeData() {
            if (this.home.lineup.length === 0) {
                this.home.lineup = this.makeLineuparray(this.numSlots)
            }
            if (this.away.lineup.length === 0) {
                this.away.lineup = this.makeLineuparray(this.numSlots)
            }
            this.spielplan.forEach(function (entry) {
                if (typeof entry.scores === 'undefined') {
                    entry.scores = {home: null, away: null}
                }
                if (typeof entry.result === 'undefined') {
                    entry.result = null;
                }
            });
            if (this.home.played.length === 0) {
                this.spielplan.forEach(function (entry, i) {
                    this.home.played.push({ids: entry.home, slot: i + 1})
                }, this)
            }
            if (this.away.played.length === 0) {
                this.spielplan.forEach(function (entry, i) {
                    this.away.played.push({ids: entry.away, slot: i + 1})
                }, this);
            }
        },
        makeLineuparray(n) {
            let arr = Array.apply(null, new Array(n));
            // eslint-disable-next-line
            return arr.map(function () {
                return 0
            });
        },
        setHome(data) {
            this.home = data
        },
        setAway(data) {
            this.away = data
        },
        setSpielplan(data) {
            this.spielplan = data
        },
        setNumSlots(value) {
            this.numSlots = value
        }
    }
}
</script>

<style>

</style>

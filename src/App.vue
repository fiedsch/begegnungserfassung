<template ref="app">
    <div>
        <div id="tl_buttons">
            <a href="contao?do=liga.begegnungserfassung" class="header_back" title="" accesskey="b" onclick="Backend.getScrollOffset()">Zurück</a>
        </div>
        <Aufstellung
                :home="home"
                :away="away"
                :slots="numSlots"
                :showspielerpass="showspielerpass"
        ></Aufstellung>
        <form method="POST" class="tl_form tl_edit_form" enctype="application/x-www-form-urlencoded">
            <div class="tl_formbody_edit">
                <input type="hidden" name="REQUEST_TOKEN" :value="requestToken">
                <input type="hidden" name="FORM_SUBMIT" value="begegnungserfassung">
                <input type="hidden" name="id" :value="begegnungId">
                <input type="hidden" name="homelineup" :value="home.lineup">
                <input type="hidden" name="awaylineup" :value="away.lineup">
                <input type="hidden" name="spielplan_code" :value="spielplan_code">
                <input type="checkbox" id="showspielerpass" v-model="showspielerpass">
                <label for="showspielerpass">Spielerpass-Nummern anzeigen</label>
                <ResultsTable
                  :home="home"
                  :away="away"
                  :spielplan="spielplan"
                  :showspielerpass="showspielerpass"
                ></ResultsTable>
                <HighlightsEntry :available="availableAll" :showspielerpass="showspielerpass"></HighlightsEntry>
            </div>
            <div class="tl_formbody_submit">
                <div class="tl_submit_container">
                    <button type="submit" name="save" id="save" class="tl_submit" accesskey="s" @click.prevent="saveFormData">Speichern</button>
                </div>
            </div>
        </form>
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
            spielplan_code: '',
            numSlots: 0,
            formData: { test: 'initial' },
            requestToken: '',
            begegnungId: '',
            showspielerpass: false
        }
    },
    computed: {
        availableAll() {
            let alllineup = [...this.home.lineup, ...this.away.lineup]
            return [...this.home.available , ...this.away.available].filter(function(el) {
                return el.id > 0 && alllineup.includes(el.id)
            }).map(function(el) {
                    return {id: el.id, name: el.name, abbrev: this.getAbbrev(el.id), pass: el.pass};
              }, this)
        }
    },
    methods: {
        getAbbrev(id) {
            let search = this.home.lineup.indexOf(id)
            if (search > -1) {
                return 'H' + (search+1)
            }
            search = this.away.lineup.indexOf(id)
            if (search > -1) {
                return 'G' + (search+1)
            }
            return id // only the id as error marker
        },
        saveFormData() {
            this.formData = new FormData(document.querySelector('form'));
            // URL aus der Contao-Installation mit installiertem ligaverwaltung-bundle
            let url = '/ligaverwaltung/erfassen/'+this.begegnungId
            this.$http.post(url, this.formData).then(
                (result) => {
                    alert(JSON.stringify(result.data))
                    // TODO: anstelle des alert()s ein visuelles Feedback für
                    // den User, daß das Speichern seiner Daten erfolgreich war.
                }
            ).catch(
                (error) => {
                    alert(error)
                }
            )
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
        setSpielplanCode(data) {
            this.spielplan_code = data
        },
        setNumSlots(value) {
            this.numSlots = value
        },
        setRequestToken(value) {
            this.requestToken = value
        },
        setBegegnungId(value) {
            this.begegnungId = value
        }
    }
}
</script>

<style>
.tl_formbody_edit {
    padding: 1rem;
}
</style>

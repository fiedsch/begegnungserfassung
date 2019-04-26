<template ref="app">
    <div>
        <div v-if="isBackendView" id="tl_buttons">
            <a href="contao?do=liga.begegnungserfassung" class="header_back" title="" accesskey="b" onclick="Backend.getScrollOffset()">Zurück</a>
        </div>
        <Aufstellung
                :home="home"
                :away="away"
                :slots="numSlots"
                :showspielerpass="showspielerpass"
        ></Aufstellung>
        <form method="POST" id="vue_begegnungserfassung" class="tl_form tl_edit_form" enctype="application/x-www-form-urlencoded">
            <div class="tl_formbody_edit">
                <input type="hidden" name="REQUEST_TOKEN" :value="requestToken">
                <input type="hidden" name="FORM_SUBMIT" value="begegnungserfassung">
                <input type="hidden" name="id" :value="begegnungId">
                <!-- sind auch in json_data enthalten => sollten entfallen können -->
                <!-- <input type="hidden" name="homelineup" :value="home.lineup"> -->
                <!-- <input type="hidden" name="awaylineup" :value="away.lineup"> -->
                <input type="hidden" name="json_data" :value="dataToSubmit">
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
                    <button type="submit" name="save" id="save" class="btn btn-primary tl_submit" accesskey="s" @click.prevent="saveFormData">Speichern</button>
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
            showspielerpass: false
        }
    },
    computed: {
        isBackendView() {
            return this.$store.state.isBackendView
        },

        // Für <Aufstellung>, das sich diese Daten aber letztlich aus dem Store selbst holt
        // und für die <ResultsTable>
        home() {
            return this.$store.state.home
        },
        away() {
            return this.$store.state.away
        },
        slots() {
            return this.$store.state.slots
        },
        numSlots() {
            return this.$store.state.numSlots
        },
        // Für das <form>
        requestToken() {
            return this.$store.state.requestToken
        },
        begegnungId() {
            return this.$store.state.begegnungId
        },
        spielplan() {
            return this.$store.state.spielplan
        },
        spielplan_code() {
            return this.$store.state.spielplan_code
        },
        // legacy
        availableAll() {
            return this.$store.getters.availableAll
        },

        dataToSubmit() {
            // TODO: aus Store
            return JSON.stringify({
                spielplan: this.spielplan,
                home: this.home,
                away: this.away,
                highlights: {
                    home: { }, // TODO: mit Daten füllen
                    away: { }
                }
            })
        }
    },
    methods: {
        saveFormData() {
            let formData = new FormData(document.querySelector('#vue_begegnungserfassung'));
            // URL aus der Contao-Installation mit installiertem ligaverwaltung-bundle
            let url = '/ligaverwaltung/erfassen/'+this.begegnungId;
            this.$http.post(url, formData).then(
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
        setData(data) {
            this.$store.dispatch("setNumSlots", data.numSlots)
            this.$store.dispatch("setSpielplan", data.spielplan)
            this.$store.dispatch("setHome", data.home)
            this.$store.dispatch("setAway", data.away)
            this.$store.dispatch("setRequestToken", undefined !== data.requestToken ? data.requestToken : '')
            this.$store.dispatch("setBegegnungId", undefined !== data.begegnungId ? data.begegnungId : 0)
            this.$store.dispatch("initializeData")
            this.$store.dispatch("setSpielplanCode", data.spielplan_code)
            this.$store.dispatch("setIsBackendView", undefined !== data.isBackendView ? data.isBackendView : false)
        }
    }
}
</script>

<style>
.tl_formbody_edit {
    padding: 1rem;
}
</style>

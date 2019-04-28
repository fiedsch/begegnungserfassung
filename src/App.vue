<template ref="app">
    <div>
        <div v-if="isBackendView" id="tl_buttons">
            <a href="contao?do=liga.begegnungserfassung" class="header_back" title="" accesskey="b" onclick="Backend.getScrollOffset()">Zurück</a>
        </div>
        <Aufstellung :showspielerpass="showspielerpass"></Aufstellung>
        <div class="showspielerpasscheckbox">
            <input type="checkbox" id="showspielerpass" v-model="showspielerpass">
            <label for="showspielerpass">Spielerpass-Nummern anzeigen</label>
        </div>
        <form method="POST" id="vue_begegnungserfassung" class="tl_form tl_edit_form" enctype="application/x-www-form-urlencoded"><!-- multipart/form-data -->
            <div class="tl_formbody_edit">
                <input type="hidden" name="REQUEST_TOKEN" :value="requestToken">
                <input type="hidden" name="FORM_SUBMIT" value="begegnungserfassung">
                <!-- Auch json_data sollten wir nicht brauchen, ABER: siehe dataToSubmit() -->
                <input type="hidden" name="json_data" :value="dataToSubmit">
            </div>
        </form>
        <ResultsTable :showspielerpass="showspielerpass"></ResultsTable>
        <HighlightsEntry :showspielerpass="showspielerpass"></HighlightsEntry>
        <div class="tl_formbody_submit">
            <div class="tl_submit_container">
                <button type="submit" name="save" id="save" class="btn btn-primary tl_submit" accesskey="s" @click.prevent="saveFormData">Speichern</button>
            </div>
        </div>
    </div>
</template>

<script>

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
        // Für das <form>
        requestToken() {
            return this.$store.state.requestToken
        },
        begegnungId() {
            return this.$store.state.begegnungId
        },
        dataToSubmit() {
            return JSON.stringify({
                spielplan: this.$store.state.spielplan,
                spielplan_code: this.$store.state.spielplan_code,
                home: this.$store.state.home,
                away: this.$store.state.away,
                highlights: this.$store.state.highlights,
                begegnungId: this.$store.state.begegnungId
            })
        }
    },
    methods: {
        saveFormData() {
            // URL aus der Contao-Installation mit installiertem ligaverwaltung-bundle
            let formData = new FormData(document.querySelector('#vue_begegnungserfassung'));
            // vs.
            // let formData = this.dataToSubmit
            // was dann aber ohne REQUEST_TOKEN wäre. Und auch, wenn wir dieses in
            //dataToSubmit einbauen mault Contao

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
            this.$store.dispatch("setHighlightsData", undefined !== data.highlights ? data.highlights : {})
        }
    }
}
</script>

<style>
.tl_formbody_edit {
    padding: 1rem;
}
.showspielerpasscheckbox {
    margin-top: 1em;
}
.showspielerpasscheckbox label {
    margin-left: .5em;
}
</style>

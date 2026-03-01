<template ref="app">
    <div class="vue_app_wrapper" data-turbo="false">
        <Aufstellung :showspielerpass="showspielerpass" :disabled="disabled"></Aufstellung>
        <div class="showspielerpasscheckbox">
            <input type="checkbox" id="showspielerpass" v-model="showspielerpass">
            <label for="showspielerpass">Spielerpass-Nummern anzeigen</label>
        </div>
        <form method="POST" id="vue_begegnungserfassung" class="tl_form tl_edit_form" enctype="application/x-www-form-urlencoded"><!-- multipart/form-data -->
            <div class="tl_formbody_edit">
                <input type="hidden" name="REQUEST_TOKEN" :value="requestToken" :disabled="disabled">
                <input type="hidden" name="FORM_SUBMIT" value="begegnungserfassung" :disabled="disabled">
                <input type="hidden" name="json_data" :value="dataToSubmit" :disabled="disabled">
            </div>
        </form>
        <ResultsTable :showspielerpass="showspielerpass" :disabled="disabled"></ResultsTable>
        <HighlightsEntry :showspielerpass="showspielerpass" :disabled="disabled"></HighlightsEntry>
        <div class="tl_formbody_submit vue_app">
            <div class="tl_submit_container">
                <button type="submit" name="save" id="save" class="btn btn-primary tl_submit" accesskey="s" @click.prevent="saveFormData" :disabled="disabled">Speichern</button>
                <!--
                &nbsp;
                <button type="submit" name="saveandclose" id="saveandclose" class="btn btn-primary tl_submit" accesskey="c" @click.prevent="saveFormDataAndClose">Speichern und schließen</button>
                -->
            </div>
        </div>
    </div>
</template>

<script>

import Aufstellung from './Aufstellung.vue'
import ResultsTable from './ResultsTable.vue'
import HighlightsEntry from './HighlightsEntry'

export default {
    name: 'begegnungs-erfassung',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        Aufstellung,
        ResultsTable,
        HighlightsEntry
    },
    data() {
        return {
            showspielerpass: false,
        }
    },
    computed: {
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
                begegnungId: this.$store.state.begegnungId,
                REQUEST_TOKEN: this.$store.state.requestToken,
                FORM_SUBMIT: 'begegnungserfassung'
            })
        },
        disabled() {
            return this.$store.state.disabled
        }
    },
    methods: {
        saveFormData() {
            let formData = new FormData(document.querySelector('#vue_begegnungserfassung'));
            // vs.
            // let formData = this.dataToSubmit
            // ... was dann (aus Contaos Sicht?) aber ohne REQUEST_TOKEN ist.
            // Auch wenn wir dieses in dataToSubmit einbauen "mault" Contao!

            this.$store.dispatch('saveData', formData)
        },
        saveFormDataAndClose() {
            let formData = new FormData(document.querySelector('#vue_begegnungserfassung'));
            this.$store.dispatch('saveDataAndClose', formData)
        },
        setData(data) {
            this.$store.dispatch("setDisabledStatus", data.disabled)
            this.$store.dispatch("setNumSlots", data.numSlots)
            this.$store.dispatch("setSpielplan", data.spielplan)
            this.$store.dispatch("setHome", data.home)
            this.$store.dispatch("setAway", data.away)
            this.$store.dispatch("setRequestToken", undefined !== data.requestToken ? data.requestToken : '')
            this.$store.dispatch("setBegegnungId", undefined !== data.begegnungId ? data.begegnungId : 0)
            this.$store.dispatch("initializeData")
            this.$store.dispatch("setSpielplanCode", data.spielplan_code)
            this.$store.dispatch("setHighlightsData", undefined !== data.highlights ? data.highlights : {})
            this.$store.dispatch("setWebserviceUrl", undefined !== data.webserviceUrl ? data.webserviceUrl : '')
        }
    },
    mounted() {
        this.setData(this.data)
    }
}
</script>

<style>
.tl_formbody_submit {
    margin-top: 2rem;
}
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

<template ref="app">
    <div class="vue_app_wrapper" data-turbo="false">
        <Aufstellung :showspielerpass="showspielerpass" :disabled="disabled"></Aufstellung>
        <div class="showspielerpasscheckbox">
            <input type="checkbox" id="showspielerpass" v-model="showspielerpass">
            <label for="showspielerpass">Spielerpass-Nummern anzeigen</label>
        </div>
        <ResultsTable :showspielerpass="showspielerpass" :disabled="disabled"></ResultsTable>
        <HighlightsEntry :showspielerpass="showspielerpass" :disabled="disabled"></HighlightsEntry>
        <div class="widget" data-turbo="false">
            <input type="hidden" name="vue_app" id="ctrl_vue_app" class="tl_text tl_custom_widget" data-turbo="false" v-model="dataToSubmit">
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
            })
        },
        disabled() {
            return this.$store.state.disabled
        }
    },
    methods: {
        setData(data) {
            this.$store.dispatch("setDisabledStatus", data.disabled)
            this.$store.dispatch("setNumSlots", data.numSlots)
            this.$store.dispatch("setSpielplan", data.spielplan)
            this.$store.dispatch("setHome", data.home)
            this.$store.dispatch("setAway", data.away)
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
.showspielerpasscheckbox {
    margin-top: 1em;
}
.showspielerpasscheckbox label {
    margin-left: .5em;
}
</style>

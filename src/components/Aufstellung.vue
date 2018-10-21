<template>
    <div>
        <div style="width:45%;float:left">
            <TeamLineup
                    :name="home.name"
                    suffix="H"
                    :available="home.available"
                    :lineup="home.lineup"
                    :slots="slots"
            ></TeamLineup>
        </div>
        <div style="width:45%;float:left">
            <TeamLineup
                    :name="away.name"
                    suffix="G"
                    :available="away.available"
                    :lineup="away.lineup"
                    :slots="slots"
            ></TeamLineup>
        </div>
    </div>
</template>

<script>
/**
 * Aufstellung der beiden Teams
 */

import TeamLineup from './TeamLineup.vue'

export default {
    name: 'Aufstellung',
    components: {
        TeamLineup
    },
    props: {
        // Daten zur Heimmanschaft
        home: {
            type: Object,
            required: true
        },
        // Daten zur Auswärtsmannschaft
        away: {
            type: Object,
            required: true
        },
        // Anzahl Spieler, die benannt (aufgestellt) werden können
        slots: {
            type: Number,
            required: true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

<template>
    <div class="aufstellung">
        <div class="team-lineup">
            <TeamLineup
                    :name="home.name"
                    suffix="H"
                    :available="home.available"
                    :lineup="home.lineup"
                    :slots="slots"
                    :showspielerpass="showspielerpass"
            ></TeamLineup>
        </div>
        <div class="team-lineup">
            <TeamLineup
                    :name="away.name"
                    suffix="G"
                    :available="away.available"
                    :lineup="away.lineup"
                    :slots="slots"
                    :showspielerpass="showspielerpass"
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
        },
        showspielerpass: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.aufstellung {
    margin-top: 1rem;
}
.team-lineup {
    display: inline-block;
    margin-right: 1rem;
}
</style>

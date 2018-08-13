<template>
    <div>
        <h2>{{ name }}</h2>
        <div v-for="i in slots" :key="'lps_'+i">
            <LineupPlayerSelect
                    :suffix="suffix"
                    :slotNumber="i"
                    :available="available"
                    :lineup="lineup"
                    @lineupplayerchanged="lineupplayerchanged"
            ></LineupPlayerSelect>
        </div>
    </div>
</template>

<script>
/**
 * Aufstellung der Spieler für einer Mannschaft
 */

import LineupPlayerSelect from './LineupPlayerSelect.vue'

export default {
    name: 'TeamLineup',
    components: {
        LineupPlayerSelect
    },
    props: {
        // Name des Teams
        name: {
            type: String,
            required: true
        },
        // 'H' oder 'G' für Heim bzw Gast
        suffix: {
            type: String,
            required: true
        },
        // Array von Objekten, jeweils ID und Name der verfügbaren Spieler
        available: {
            type: Array,
            required: true
        },
        // IDs der aufgestellten Spieler
        lineup: {
            type: Array,
            required: true
        },
        // Anzahl Spieler, die benannt (aufgestellt) werden können
        slots: {
            type: Number,
            required: true
        }
    },
    methods: {
        lineupplayerchanged(slotnumber, selected) {
            this.lineup[slotnumber-1] = selected;
            // make change "visible" (this is most likely not the proper way)
            // FIXME: use set()
            this.lineup.push(this.lineup.pop());
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

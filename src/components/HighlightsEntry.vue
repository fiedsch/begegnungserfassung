<template>
    <div class="highlights" v-if="sortedPlayedAll.length>0">
        <h2>Highlights</h2>
        <table>
            <thead>
                <tr>
                    <th>Spieler</th>
                    <th>180er</th>
                    <th>171er</th>
                    <th>Highfinish</th>
                    <th>Shortleg</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(player, i) in sortedPlayedAll" :key="'pr_'+i">
                    <td>
                        ({{ player.abbrev }}) {{ player.name }}
                        <span v-show="showspielerpass">({{ player.pass }})</span>
                    </td>

                    <td><NumberInput :inputname="'one80_'+player.id" :placeholder="'180er'"></NumberInput></td>
                    <td><NumberInput :inputname="'one71_'+player.id" :placeholder="'171er'"></NumberInput></td>
                    <td><NumberListInput :inputname="'highfinish_'+player.id" :placeholder="'Highfinishes'"></NumberListInput></td>
                    <td><NumberListInput :inputname="'shortleg_'+player.id" :placeholder="'Shortlegs'"></NumberListInput></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/**
 * Eingabe von Highhlights für einzelne Spieler
 */

import NumberInput from './NumberInput.vue'
import NumberListInput from './NumberListInput.vue'

export default {
    name: 'HighlightsEntry',
    components: {
        NumberInput,
        NumberListInput
    },
    props: {
        // Verfügbare Spieler: Array von Objekten, jeweils ID und Name der verfügbaren Spieler
        showspielerpass: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        sortedPlayedAll() {
            let tmp = this.$store.getters.playedAll.slice(0) // do not change this.available by sorting it (work on a clone)
            return tmp.sort(function(a,b) {
                if (a.abbrev.match(/^H/) && b.abbrev.match(/^G/)) { return -1 }
                if (a.abbrev.match(/^G/) && b.abbrev.match(/^H/)) { return +1 }
                return a.abbrev > b.abbrev ? +1 : -1
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.highlights {
    padding-top: 2rem;
}
.highlights h2 {
    margin-bottom: 1rem;
}
.highlights th {
    padding: 1rem;
}
.highlights td {
    padding: .3rem;
}
</style>

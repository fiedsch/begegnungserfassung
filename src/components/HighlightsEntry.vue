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
                    <td v-bind:class="{'label': true, 'active': player.id == currentId }">
                        ({{ player.abbrev }}) {{ player.name }}
                        <span v-show="showspielerpass">({{ player.pass }})</span>
                    </td>
                    <td><NumberInput @focus="onFocus" @blur="onBlur" :inputname="'one80_'+player.id" :placeholder="'180er'"  :disabled="disabled"></NumberInput></td>
                    <td><NumberInput  @focus="onFocus" @blur="onBlur" :inputname="'one71_'+player.id" :placeholder="'171er'" :disabled="disabled"></NumberInput></td>
                    <td><NumberListInput @focus="onFocus" @blur="onBlur" :inputname="'highfinish_'+player.id" :placeholder="'Highfinishes'" :disabled="disabled"></NumberListInput></td>
                    <td><NumberListInput @focus="onFocus" @blur="onBlur" :inputname="'shortleg_'+player.id" :placeholder="'Shortlegs'" :disabled="disabled"></NumberListInput></td>
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
    data() {
        return {
            currentId: null
        }
    },
    props: {
        // Verfügbare Spieler: Array von Objekten, jeweils ID und Name der verfügbaren Spieler
        showspielerpass: {
            type: Boolean,
            default: false
        },
        disabled: {
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
    },
    methods: {
        onFocus(e) {
            this.currentId = e
        },
        onBlur() {
            this.currentId = null
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
td.label {
    max-width: 12rem;
    overflow: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.active {
    font-weight: bold;
}
</style>

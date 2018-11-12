<template>
    <div class="highlights" v-if="available.length>0">
        <h2>Highlights</h2>
        <table>
            <thead>
            <tr>
                <th>Spieler</th>
                <th>180er</th>
                <th>171er</th>
                <th>Shortleg</th>
                <th>Highfinish</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(player, i) in sortedAvailable" :key="'pr_'+i">
                <td>({{ player.abbrev }}) {{ player.name }}</td>
                <td><input :name="'one80_'+player.id" v-model="highlights[i].scores.one80" placeholder="180er"></td>
                <td><input :name="'one71_'+player.id" v-model="highlights[i].scores.one71" placeholder="171er"></td>
                <td><input :name="'highfinish_'+player.id" v-model="highlights[i].scores.highfinish" placeholder="Highfinish"></td>
                <td><input :name="'shortleg_'+player.id" v-model="highlights[i].scores.shortleg" placeholder="Shortlegs"></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/**
 * Eingabe von Highhlights für einzelne Spieler
 */

export default {
    name: 'HighlightsEntry',
    props: {
        // Verfügbare Spieler: Array von Objekten, jeweils ID und Name der verfügbaren Spieler
        available: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
        }
    },
    computed: {
        sortedAvailable() {
            let tmp = this.available.slice(0) // do not change this.available by sorting it (work on a clone)
            return tmp.sort(function(a,b) {
                if (a.abbrev.match(/^H/) && b.abbrev.match(/^G/)) { return -1 }
                if (a.abbrev.match(/^G/) && b.abbrev.match(/^H/)) { return +1 }
                return a.abbrev > b.abbrev ? +1 : -1
            })
        },
        highlights() {
            let result = [ ];
            this.available.forEach((el, i) => {
                result.push({id: i, scores: {one80: '', one71: '', shortleg: '', highfinish: ''}})
            });
            return result
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
.highlighte th {
    padding: 1rem;
}
</style>

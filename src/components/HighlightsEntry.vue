<template>
    <div>
        <h2>Highlights</h2>
        <table>
            <thead>
            <tr>
                <td>Spieler</td>
                <td>180er</td>
                <td>171er</td>
                <td>Shortleg</td>
                <td>Highfinish</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(player, i) in available" :key="'pr_'+i">
                <td>{{ player.name }}</td>
                <td><input :name="'one80_'+player.id" v-model="highlights[i].scores.one80" placeholder="180er"></td>
                <td><input :name="'one71_'+player.id" v-model="highlights[i].scores.one71" placeholder="171er"></td>
                <td><input :name="'shortleg_'+player.id" v-model="highlights[i].scores.shortleg" placeholder="Shortlegs"></td>
                <td><input :name="'highfinish_'+player.id" v-model="highlights[i].scores.highfinish" placeholder="Highfinish"></td>
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
</style>

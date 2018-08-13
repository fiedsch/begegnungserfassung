<template>
    <input
            class="form-control"
            :name="inputname" v-model.number="score"
            type="number"
            min="0" max="3"
            autocomplete="off"
            title="Spieler Score"
    >
</template>

<script>
/**
 *
 */

    export default {
    name: 'SpielerScore',
    props: {
        team: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        spielplan: {
            type: Array,
            required: true
        }
    },
    computed: {
        inputname: {
            get: function () {
                return 'score_' + this.team.key + '_' + this.index
            }
        },
        score: {
            get: function () {
                return this.spielplan[this.index].scores[this.team.key]
            },
            set: function (newValue) {
                let result = null, current = this.spielplan[this.index];
                current.scores[this.team.key] = newValue === '' ? null : newValue;
                // Wenn beide Ergebnisse vorliegen gibt es das Gesamtergebnis (Seiteneffekt: result setzen)
                if (current.scores['home'] != null && current.scores['away'] != null) {
                    if (current.scores['home'] === current.scores['away']) {
                        result = '1:1'
                    } else if (current.scores['home'] < current.scores['away']) {
                        result = '0:1'
                    } else if (current.scores['home'] > current.scores['away']) {
                        result = '1:0'
                    }
                }
                current.result = result;
                // .splice to trigger Vue's view updates,
                // see https://vuejs.org/v2/guide/list.html#Caveats
                // FIXME: use .set()
                this.spielplan.splice(this.index, 1, current);
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

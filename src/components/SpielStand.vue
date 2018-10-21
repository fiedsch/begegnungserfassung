<template>
    <span class="spielstand">{{ spielstand[1] }}:{{ spielstand[2] }}</span>
</template>

<script>
/**
 * (Anzeige des) Gesamtstands Punkte (Spielstand)
 */

export default {
    name: 'SpielStand',
    props: {
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
        spielstand() {
            return this.spielplan.reduce(function (acc, currentValue, currentIndex) {
                if (currentIndex <= acc[0]) {
                    if (currentValue.scores.home !== null && currentValue.scores.away !== null) {
                        if (currentValue.scores.home > currentValue.scores.away) {
                            acc[1] += 1;
                        } else if (currentValue.scores.home < currentValue.scores.away) {
                            acc[2] += 1;
                        }
                    }
                }
                return acc;
            }, [ this.index, 0, 0 ]);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

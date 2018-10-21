<template>
    <span class="legsstand">{{ legsstand[1] }}:{{ legsstand[2] }}</span>
</template>

<script>
/**
 * (Anzeige des) Gesamtstands Legs
 */
export default {
    name: 'LegStand',
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
        legsstand() {
            return this.spielplan.reduce(function (acc, currentValue, currentIndex) {
                if (currentIndex <= acc[0]) {
                    if (currentValue.scores && currentValue.scores.home != null && currentValue.scores.away != null) {
                        acc[1] += currentValue.scores.home;
                        acc[2] += currentValue.scores.away;
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

<template>
    <tbody>
    <tr
        v-for="(spiel,index) in spielplan"
        :key="'row_'+index"
    >
        <td><span class="slot">{{ index+1 }}</span></td>
        <td><SpielerSelect :team="home" :position="spiel.home" :index="index" :spielplan="spielplan"></SpielerSelect></td>
        <td><SpielerSelect :team="away" :position="spiel.away" :index="index" :spielplan="spielplan"></SpielerSelect></td>
        <td class="narrow centered"><SpielerScore :team="home" :index="index" :spielplan="spielplan"></SpielerScore></td>
        <td class="narrow centered"><SpielerScore :team="away" :index="index" :spielplan="spielplan"></SpielerScore></td>
        <td class="narrow centered"><SpielErgebnis class="spiel" :index="index" :spielplan="spielplan"></SpielErgebnis></td>
        <td class="narrow centered">
            <span v-if="spiel.scores.home != null && spiel.scores.away != null">
                <SpielStand class="gesamt" :index="index" :spielplan="spielplan"></SpielStand>
            </span>
        </td>
    </tr>
    <tr>
        <td colspan="5"></td>
        <td colspan="1" class="centered"><LegStand class="gesamt" :index="spielplan.length" :spielplan="spielplan"></LegStand></td>
        <td colspan="1" class="centered"><SpielStand class="gesamt" :index="spielplan.length" :spielplan="spielplan"></SpielStand></td>
    </tr>
    </tbody>
</template>

<script>
/**
 *
 */

import SpielerSelect from './SpielerSelect.vue'
import SpielerScore from './SpielerScore.vue'
import SpielErgebnis from './SpielErgebnis.vue'
import LegStand from './LegStand.vue'
import SpielStand from './SpielStand.vue'

export default {
    name: 'TableBody',
    components: {
        SpielerSelect,
        SpielerScore,
        SpielErgebnis,
        LegStand,
        SpielStand
    },
    props: {
        home: {
            type: Object,
            required: true
        },
        away: {
            type: Object,
            required: true
        },
        spielplan: {
            type: Array,
            required: true
        }
    },
    methods: {
        getResult(index, i) { return index+i; }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
td.centered {
    text-align: center;
}
.spielstand.gesamt {
    font-weight: bold;
}
</style>

<template>
    <div class="linup-player">
        <span class="slot">{{ suffix }}{{ slotNumber }}</span>
        <select v-model="selected" :name="selectname" class="tl_select unsetwidth">
            <option
                v-for="a in available" :value="a.id"
                :key="'player_'+a.id"
                :class="{ isNotAvailable: !isAvailable(a.id) }"
                :disabled="!isAvailable(a.id)">
                {{ a.name }} <span v-if="showspielerpass && a.pass > 0">({{ a.pass }})</span>
            </option>
        </select>
    </div>
</template>

<script>
/**
 * Auswahl eines Spielers in der Aufstellung
 */

export default {
  name: 'LineupPlayerSelect',
    props: {
        // Array von Objekten, jeweils ID und Name der verfügbaren Spieler
        available: {
            type: Array,
            required: true
        },
        // IDs der aufgestellten Spieler in der Reihenfolge der Aufstellung
        lineup: {
            type: Array,
            required: true
        },
        slotNumber: {
            type: Number,
            required: true
        },
        suffix: {
            type: String,
            required: true
        },
        showspielerpass: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selected: this.slotNumber <= this.lineup.length ? this.lineup[this.slotNumber-1] : 0
        }
    },
    computed: {
        selectname() {
            return this.suffix+'_lineup_player_'+this.slotNumber
        }
    },
    watch: {
        selected() {
            this.$emit("lineupplayerchanged", this.slotNumber, this.selected);
        }
    },
    methods: {
        isAvailable(id) {
            return id === 0 || !this.lineup.includes(id);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
div.linup-player {
    margin: 0;
}
span.slot {
    display: inline-block;
    margin-right: 1rem;
}
.tl_select.unsetwidth {
    width: unset;
}
</style>

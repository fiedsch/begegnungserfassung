<template>
    <span>
        <select
            class="tl_select unsetwidth"
            title="SpleierSelect"
            v-model="selected"  v-bind:class="{ double: isDouble, winner: isWinner, loser: isLoser }"
            :name="selectname" tabindex="-1">
            <option
                v-for="lineupindex in team.lineup.length"
                :key="'pl1_'+(lineupindex-1)"
                :value="lineupindex-1">{{ spielername(lineupindex-1) }}
            </option>
        </select>
        <select
            class="tl_select unsetwidth"
            title="SpleierSelect2"
            v-if="isDouble"
            v-model="selected2" v-bind:class="{ double: isDouble, winner: isWinner, loser: isLoser }"
            :name="selectname2" tabindex="-1">
            <option
                v-for="lineupindex in team.lineup.length"
                :key="'pl2_'+(lineupindex-1)"
                :value="lineupindex-1">{{ spielername(lineupindex-1) }}
            </option>
        </select>
    </span>
</template>

<script>
/**
 *
 */

export default {
    name: 'SpielerSelect',
    props: {
        // Alle Daten zum Team
        team: {
            type: Object
        },
        // Index (oder Indices bei Doppeln) der Spieler-ID im Array lineup
        position: {
            type: Array
        },
        // (nullbasierter) Zeilenindex (Nummer des Spiels -1)
        index: {
            type: Number
        },
        spielplan: {
            type: Array,
            required: true
        },
        showspielerpass: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        spielername: function(index) {
            if (typeof index === 'undefined') { index = 0; }
            let spielerid = this.team.lineup[index];
            if (typeof spielerid === 'undefined') { spielerid = 0; }
            let player = this.team.available.filter(function (v) {
                return v.id === spielerid;
            });
            if (player.length === 0) { return "Kein Name für Pos. "+index; }
            let suffix = this.team.key === 'home' ? "H" : "G";
            return "("+suffix+(index+1)+") " + player[0].name + ( this.showspielerpass && player[0].pass>0 ? " ("+player[0].pass+")" :'' );
        }
    },
    computed: {
        selectname() {
            return 'spieler_' + this.team.key + '_' + this.index + (this.isDouble ? '_1' : '')
        },
        selectname2() {
            return 'spieler_' + this.team.key + '_' + this.index + (this.isDouble ? '_2' : '')
        },
        selected: {
            get() {
                return this.team.played[this.index].ids[0]
            },
            set(value) {
                this.team.played[this.index].ids[0] = value;
                // force update:
                // FIXME: use set()
                this.team.played.push(this.team.played.pop())
            }
        },
        selected2: {
            get() {
                return this.team.played[this.index].ids[1]
            },
            set(value) {
                this.team.played[this.index].ids[1] = value;
                // force update:
                // FIXME: use set()
                this.team.played.push(this.team.played.pop())
            }
        },
        isWinner() {
            let other = this.team.key === 'home' ? 'away' : 'home';
            let spiel = this.spielplan[this.index];
            if (spiel.scores[this.team.key] == null || spiel.scores[other] == null) {
                return false
            }
            if (spiel.scores[this.team.key] === '' || spiel.scores[other] === '') {
                return false
            }
            return spiel.scores[this.team.key] > spiel.scores[other]
        },
        isLoser() {
            let other = this.team.key === 'home' ? 'away' : 'home';
            let spiel = this.spielplan[this.index];
            if (spiel.scores[this.team.key] == null || spiel.scores[other] == null) {
                return false
            }
            if (spiel.scores[this.team.key] === '' || spiel.scores[other] === '') {
                return false
            }
            return spiel.scores[this.team.key] < spiel.scores[other]
        },
        isDouble() {
            return this.position.length > 1
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*
select.winner { background-color: #dff0d8; color: #3c763d; }
select.loser { }
*/

.tl_select.unsetwidth {
    width: unset;
}
</style>

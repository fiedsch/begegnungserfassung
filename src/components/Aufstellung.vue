<template>
    <div class="aufstellung">
        <div class="team-lineup">
            <TeamLineup
                    :name="home.name"
                    suffix="H"
                    :available="home.available"
                    :lineup="home.lineup"
                    :slots="slots"
                    :showspielerpass="showspielerpass"
                    :disabled="disabled"
            ></TeamLineup>
        </div>
        <div class="team-lineup">
            <TeamLineup
                    :name="away.name"
                    suffix="G"
                    :available="away.available"
                    :lineup="away.lineup"
                    :slots="slots"
                    :showspielerpass="showspielerpass"
                    :disabled="disabled"
            ></TeamLineup>
        </div>
    </div>
</template>

<script>
/**
 * Aufstellung der beiden Teams
 */

import TeamLineup from './TeamLineup.vue'

export default {
    name: 'Aufstellung', // eslint-disable-line vue/multi-word-component-names
    components: {
        TeamLineup
    },
    props: {
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
        home() {
            return this.$store.state.home
        },
        away() {
            return this.$store.state.away
        },
        slots() {
            return this.$store.state.numSlots
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.aufstellung {
    margin-top: 1rem;
}
.team-lineup {
    display: inline-block;
    margin-right: 1rem;
}
</style>

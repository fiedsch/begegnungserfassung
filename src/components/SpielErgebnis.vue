<template>
    <span>{{ result }}</span>
</template>

<script>
/**
 * (Anzeige des) Ergebnis eines Spiels (zwei Spieler gegeneinander oder ein Doppel)
 */

export default {
    name: 'SpielErgebnis',
    props: {
        index: {
            type: Number,
            required: true
        }
    },
    computed: {
        result() {
            return this.$store.state.spielplan[this.index].result
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

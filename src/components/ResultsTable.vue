<template>
    <table>
        <TableHeader :home="home" :away="away"></TableHeader>
        <TableBody :home="home" :away="away" :spielplan="spielplan"></TableBody>
    </table>
</template>

<script>
/**
 *
 */

import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
export default {
    name: 'ResultsTable',
    components: {
        TableHeader,
        TableBody
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

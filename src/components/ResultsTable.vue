<template>
    <div class="results-table">
        <table>
            <TableHeader :home="home" :away="away"></TableHeader>
            <TableBody :home="home" :away="away" :spielplan="spielplan" :showspielerpass="showspielerpass"></TableBody>
        </table>
    </div>
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
        },
        showspielerpass: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.results-table {
    margin-top: 2rem;
}
</style>

<template>
    <div class="results-table">
        <table>
            <TableHeader></TableHeader>
            <TableBody :showspielerpass="showspielerpass"></TableBody>
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

<template>
    <div class="results-table">
        <div>
            <input type="checkbox" id="automove" v-model="automove">
            <label for="automove">Bei der Eingabe automatisch in das nächste Feld springen</label>
        </div>
        <table>
            <TableHeader></TableHeader>
            <TableBody :showspielerpass="showspielerpass" :automove="automove" :disabled="disabled"></TableBody>
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
    data() {
        return {
            automove: false, // automatically move to the next field once a value has been entered (mobile devices don't have a tab key)
        }
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.results-table {
    margin-top: 2rem;
}
</style>

<template>
    <thead>
        <tr>
            <th> </th>
            <th> {{ home.name }} </th>
            <th> {{ away.name }} </th>
            <th> {{ home.name }} </th>
            <th> {{ away.name }} </th>
            <th> Spiel </th>
            <th> Gesamt </th>
        </tr>
    </thead>
</template>

<script>
/**
 *
 */

export default {
    name: 'TableHeader',
    computed: {
        home() {
            return this.$store.state.home
        },
        away() {
            return this.$store.state.away
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
th {
    padding: 1rem;
}
</style>

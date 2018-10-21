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
    props: {
        home: {
            type: Object,
            required: true
        },
        away: {
              type: Object,
            required: true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

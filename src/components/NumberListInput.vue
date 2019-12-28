<template>
    <input
            class="form-control numberlist-input" :class="{'valid':isValid, 'invalid':!isValid}"
            :name="inputname"
            :placeholder="placeholder"
            autocomplete="off"
            @change="update"
            :value="value"
    >
</template>

<script>
export default {
    name: 'NumberListInput',
    props: {
        inputname: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ""
        }
    },
    computed: {
        value() {
            return this.$store.state.highlights[this.inputname]
        },
        isValid() {
            return undefined === this.val || String(this.val).match(/^(\d+,{0,1})*$/)
        }
    },
    methods: {
        update(event) {
            this.$store.dispatch('setHighlight', { key: event.target.name, value: event.target.value })
        }
    },
    watch: {
        inputname(newName, oldName) {
            this.$store.dispatch('setHighlight', {key: newName, value: this.$store.state.highlights[oldName]})
            this.$store.dispatch('setHighlight', { key: oldName, value: '' })
        }
    },
    beforeDestroy() {
        this.$store.dispatch('setHighlight', { key: this.inputname, value: '' })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.numberlist-input.valid { }
.numberlist-input.invalid {
    background-color: orangered;
    color: white;
}
</style>

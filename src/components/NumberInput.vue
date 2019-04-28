<template>
    <input
            class="form-control number-input" :class="{'valid':isValid, 'invalid':!isValid}"
            :name="inputname"
            :placeholder="placeholder"
            autocomplete="off"
            @change="update"
            :value="value"
    >
</template>

<script>
export default {
    name: 'NumberInput',
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
            return undefined === this.val || String(this.val).match(/^\d*$/)
        }
    },
    methods: {
        update(event) {
            this.$store.dispatch('setHighlight', { key: event.target.name, value: event.target.value })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    input[type=number].number-input::-webkit-inner-spin-button,
    input[type=number].number-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        -moz-appearance:textfield;
        width: inherit;
    }
.number-input.valid { }
.number-input.invalid {
    background-color: orangered;
    color: white;
}
</style>

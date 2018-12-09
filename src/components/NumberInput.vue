<template>
    <input
            class="form-control number-input" :class="{'valid':isValid, 'invalid':!isValid}"
            :name="inputname" v-model="val"
            :placeholder="placeholder"
            autocomplete="off"
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
        },
        value: {
            type: String
        },
    },
    data() {
      return {
          val: this.value
      }
    },
    computed: {
        isValid() {
            return String(this.val).match(/^\d*$/)
        },
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

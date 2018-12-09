<template>
    <input
            class="form-control numberlist-input" :class="{'valid':isValid, 'invalid':!isValid}"
            :name="inputname" v-model="val"
            :placeholder="placeholder"
            autocomplete="off"
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
            return String(this.val).match(/^(\d+,{0,1})*$/)
        }
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

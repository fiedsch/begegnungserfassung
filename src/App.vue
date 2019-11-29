<template>
  <div id="begegnungserfassung">
      <BegegnungsErfassung
          :data="data"
      ></BegegnungsErfassung>
  </div>
</template>

<script>
import BegegnungsErfassung from "./components/BegegnungsErfassung";

export default {
    name: 'app',
    components: {
        BegegnungsErfassung
    },
    data() {
        return {
            // eslint-disable-next-line
            data: data // aus globaler Variable
        }
    }
}
</script>

<style>
</style>

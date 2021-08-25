<template>
  <input type="text" :value="query">
</template>

<script>
export default {
  data: function () {
    return {
      query: 'attention is all you need',
    }
  },
  mounted() {
    fetch('http://localhost:8000/search?' + new URLSearchParams({ q: this.query }))
      .then(result => result.json())
      .then(data => console.log(data))
      .catch(err => console.log(`Data retrevale error: ${err.message}`))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

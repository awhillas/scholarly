<template>
  <div id="searchForm">
    <input type="text" v-model="query">
    <button v-on:click="doQuery">Search</button>
  </div>
</template>

<script>
export default {
  props: {

  },
  data: function () {
    return {
      query: 'dependency parsing',
      papers: {}
    }
  },
  methods: {
    doQuery() {
      fetch('http://localhost:8000/search?' + new URLSearchParams({ q: this.query }))
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.$store.commit("updatePapers", data.results)
        })
        .catch(err => console.log(`Search error: ${err.message}`))      
    }
  },
  mounted() {
    this.doQuery()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

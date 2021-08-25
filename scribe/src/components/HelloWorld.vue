<template>
  <div>
    <input type="text" v-model="query">
    <button v-on:click="doQuery">Search</button>

    <div id="results" v-if="papers">
      <ul id="example-1">
        <li v-for="item in papers" :key="item.gid">
          <p>{{ item.gid }}</p>
          <p><a :href="item.paper_link">{{ item.title }}</a></p>
          <p>{{ item.paper_link }}</p>
          <p>{{ item.year }}</p>
          <p>{{ item.citations }}</p>
        </li>
      </ul>    
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      query: 'attention is all you need',
      papers: {}
    }
  },
  methods: {
    doQuery() {
      fetch('http://localhost:8000/search?' + new URLSearchParams({ q: this.query }))
        .then(response => response.json())
        .then(data => {
          this.papers = data.results
          console.log(data)
        })
        .catch(err => console.log(`Data retrevale error: ${err.message}`))
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

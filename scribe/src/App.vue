<template>
  <div id="root">
    <SearchForm />
    <PapersGraph />
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue'
import PapersGraph from './components/PapersGraph.vue'

export default {
  name: 'Scholarly',
  components: {
    SearchForm,
    PapersGraph
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

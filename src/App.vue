<template>
  <div id="app">
    <main-page />
  </div>
</template>

<script>
import mainPage from  "@/components/main-page"
export default {
  name: 'App',
  components: {
    mainPage
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

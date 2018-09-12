<template>
  <div id="app">
    {{msg}}
    <home></home>
  </div>
</template>

<script>
import Home from "./components/home";
export default {
  name: 'app',
  data: () => ({ msg: 1 }),
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

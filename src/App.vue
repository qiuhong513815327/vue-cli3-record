<template>
  <div id="app">
    <header>
      <router-link to="/" exact-active-class="my-active">Home</router-link>
      <router-link to="/search" exact-active-class="my-active"
        >Search</router-link
      >
      <router-link to="/imageDrag" exact-active-class="my-active"
        >ImageDrag</router-link
      >
    </header>
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "home"
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app > header {
  display: flex;
}
#app > header > a {
  text-decoration: none;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #409eff;
  background: #ecf5ff;
  border: 1px solid #b3d8ff;
  border-radius: 4px;
  padding: 0 10px;
  margin-right: 10px;
  &.my-active {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
}
</style>

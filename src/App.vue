<template>
  <div id="app">
    <router-link to="/" exact-active-class="my-active">Home</router-link> |
    <router-link to="/search" exact-active-class="my-active"
      >Search</router-link
    >
    <router-view />
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
  watch: {
    "$store.state": {
      deep: true,
      handler() {
        this.getMetaEl();
      }
    }
  },
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
#app > a {
  text-decoration: none;
  color: black;
}
#app > .my-active {
  color: rgb(17, 222, 236);
}
</style>

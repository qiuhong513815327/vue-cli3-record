<template>
  <div class="watch-data-wrap">
    <h1>监听Home页面</h1>
    <div class="textarea-wrap">
      <div class="vux-wrap">监听localStorage：{{ storage }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "watchData",
  data() {
    return {
      storage: ""
    };
  },
  mounted() {
    window.addEventListener("storage", this.watchStorage);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("storage", this.watchStorage);
    });
  },
  methods: {
    watchStorage(e) {
      console.log("e:::", e.newValue);
      console.log("localStorage:::", localStorage.test);
      this.storage = e.newValue;
    }
  }
};
</script>

<style lang="less">
.watch-data-wrap {
  .vux-wrap {
    margin: 0 auto;
    height: 200px;
    width: 300px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>

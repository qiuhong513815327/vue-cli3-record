<template>
  <div class="search-wrapper"></div>
</template>
<script>
export default {
  name: "Search",
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.search-wrapper {
  box-sizing: border-box;
  position: relative;
  margin: 50px auto;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  width: 196px;
  height: 32px;
  &.search-focus {
    border-color: rgb(26, 136, 238);
  }
}
</style>

<template>
  <div class="search-wrapper">
    <div class="searcher-input-btn">
      <input
        v-model.trim="str"
        type="text"
        @input="change"
        @focus="focusblur"
        @keydown.down.prevent="keyWordEdit(1)"
        @keydown.up.prevent="keyWordEdit(-1)"
        @keydown.enter.prevent="enterEdit"
        ref="input"
        class="searcher-input"
        placeholder="请输入"
      />
    </div>
    <!-- 搜索结果 -->
    <div
      class="search-result"
      v-show="support.inputFocus === true && support.searchContr.tempStr"
    >
      <!-- <div class="search-result"> -->
      <div class="res-list" ref="resultContent">
        <div
          v-for="(item, index) in resList"
          :key="index"
          :class="{
            'res-item': true,
            'item-active': support.navigat.index === index
          }"
          @click="selectItem(item)"
          @mousedown="support.blurClick = true"
        >
          <!-- mousedown事件处理选中前防止搜索结果被清空关闭，由于全局注册了点击事件关闭结果，这里mousedown可以提前click处理做一些标志 -->
          {{ item.name }}
        </div>
        <div v-show="resList.length === 0" class="tip">
          <span v-if="support.searchState[support.indexSearch] !== 'dosearch'"
            >暂无相关内容</span
          >
          <span v-else>{{ "正在搜索：" + support.searchContr.tempStr }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      str: "",
      lastStr: "",
      resList: [],
      support: {
        searchContr: {
          delay: 300,
          timer: null,
          tempStr: "",
          // searchStr: null,
          count: 0
        },
        indexSearch: null,
        searchState: {},
        inputFocus: false,
        blurClick: false,
        navigat: {
          index: 0
        }
      },
      targetDom: ["searcher-input"]
    };
  },
  mounted() {
    // 空白处点击关闭搜索结果
    window.addEventListener("click", this.closeSearchResult);
    // 页面销毁前移除页面下的点击事件
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("click", this.closeSearchResult);
    });
  },
  methods: {
    change(e) {
      // 中文输入时，键盘还未键入空格，this.str的值不会被重新赋值，所以最后的搜索词this.lastStr先进行保存
      // 此时键盘可能还未按下空格，所以当前的搜索词若和最后一次的搜索词相同，则不搜索
      if (this.lastStr === this.str) return;
      this.lastStr = this.str;
      // 判断当前输入法是否为中文输入，也和上面判断同理，阻止空格键入前搜素
      if (e.inputType === "insertCompositionText") return;
      this.support.searchContr.tempStr = this.str;
      if (this.support.searchContr.timer) {
        clearTimeout(this.support.searchContr.timer);
        this.support.searchContr.timer = null;
      }
      // 空搜索
      if (!this.support.searchContr.tempStr) {
        this.doSearch(this.support.searchContr.tempStr);
      }
      // 防抖处理
      this.support.searchContr.timer = setTimeout(() => {
        this.doSearch(this.support.searchContr.tempStr);
      }, this.support.searchContr.delay);
    },
    doSearch(str) {
      this.support.searchContr.searchStr = str;
      // 处理多次键入的搜索打断
      if (this.support.indexSearch) {
        this.support.searchState[this.support.indexSearch] = "cancel";
      }
      if (str) {
        this.getSearchResult(++this.support.searchContr.count, str);
        this.support.indexSearch = this.support.searchContr.count;
        this.support.searchState[this.support.indexSearch] = "dosearch";
      }
      // 如果键入删除，则清空搜索结果，通过打断请求数据
      else {
        this.support.searchState[this.support.indexSearch] = "cancel";
        this.support.indexSearch = null;
        this.resList = [];
      }
    },
    async getSearchResult(index, str) {
      console.log(str);
      this.resList = [];
      let res = await axios.get("/getSearch");
      try {
        if (res.data.code === "200") {
          if (this.support.searchState[index] === "cancel") return;
          this.support.searchState[index] = "done";
          this.resList = res.data.data;
          this.support.navigat.index = -1;
          this.keyWordEdit(1);
        }
      } catch (error) {
        this.support.searchState[index] = "error";
      }
    },
    focusblur() {
      this.doSearch(this.support.searchContr.tempStr);
      this.support.inputFocus = true;
    },
    clearSearch() {
      if (this.support.searchContr.timer) {
        clearTimeout(this.support.searchContr.timer);
        this.support.searchContr.timer = null;
      }
    },
    // 关闭搜索结果
    closeSearchResult(e) {
      // 如果是点击在input框聚焦就不要关闭搜索结果
      if (this.targetDom.includes(e.target.className)) return;
      if (this.support.blurClick === true) {
        this.support.blurClick = false;
        return;
      }
      this.support.inputFocus = false;
      this.clearSearch();
    },
    // 选中搜索结果
    selectItem(item) {
      this.support.searchContr.tempStr = this.lastStr = this.str = item.name;
      this.clearSearch();
      this.support.inputFocus = false;
    },
    // 上下方向按键操作选择结果
    keyWordEdit(num) {
      let step = 0;
      if (this.resList.length === 0) return;
      let temp = this.support.navigat.index;
      //temp < this.resList.length - 1，判断选中位置的索引是否达到最大位置，累加值为0，键入向下或者向上无效
      if (num > 0 && temp < this.resList.length - 1) step = 1;
      if (num < 0 && temp > 0) step = -1;
      // 存入当前的键入位置的索引
      if (step !== 0) this.support.navigat.index += step;
    },
    // enter按键操作选择结果
    enterEdit() {
      if (this.resList.length === 0) return;
      let index = this.support.navigat.index;
      if (index > -1) this.lastStr = this.str = this.resList[index]["name"];
      // 关闭搜索结果区域
      this.support.inputFocus = false;
      this.clearSearch();
      this.resList = [];
      // 保持搜索结果区域为聚焦状态，键入重新搜索
      this.support.inputFocus = true;
      this.support.searchContr.tempStr = "";
    }
  }
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
  width: 300px;
  height: 32px;
  &.search-focus {
    border-color: rgb(26, 136, 238);
  }
  .searcher-input-btn {
    vertical-align: top;
    font-size: 0;
    position: relative;
    .searcher-input {
      position: absolute;
      -webkit-appearance: none;
      outline: 0;
      box-sizing: border-box;
      width: 100%;
      height: 24px;
      border: 0;
      font-size: 14px;
      line-height: 24px;
      color: #4a4a4a;
      background: transparent;
      top: 3px;
      left: 0;
      padding: 0 15px;
      &::placeholder {
        color: #c0c4cc;
      }
    }
  }
  .search-result {
    position: absolute;
    width: 300px;
    top: 48px;
    left: 0;
    z-index: 10;

    // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    // border-radius: 4px;
    // border: 1px solid #e4e7ed;
    // box-sizing: border-box;
    // background-color: #fff;
    .res-list {
      padding: 8px 0;
      overflow-y: auto;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      border-radius: 4px;
      border: 1px solid #e4e7ed;
      box-sizing: border-box;
      background-color: #fff;
      max-height: 48px 0;
      .res-item {
        line-height: 40px;
        cursor: pointer;
        white-space: nowrap;
        &:hover {
          background-color: #f5f7fa;
        }
        &.item-active {
          background-color: #f5f7fa;
        }
      }
    }
    .tip {
      padding: 8px 16px;
      color: #9b9b9b;
    }
    &::before {
      position: absolute;
      box-sizing: border-box;
      top: -18px;
      left: 46px;
      z-index: 55;
      content: "";
      border-top: 10px solid transparent;
      border-bottom: 10px solid #fff;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
    }
    &::after {
      position: absolute;
      box-sizing: border-box;
      top: -20px;
      left: 46px;
      content: "";
      border-top: 10px solid transparent;
      border-bottom: 10px solid #ebeef5;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
    }
  }
}
</style>

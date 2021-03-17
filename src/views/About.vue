<template>
  <div class="search-wrapper">
    <div class="searcher-input-btn">
      <input
        v-model.trim="str"
        type="text"
        @input="change"
        @focus="focusblur"
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
          class="res-item"
          v-for="(item, index) in resList"
          :key="index"
          @click="selectItem(item)"
          @mousedown="support.blurClick = true"
        >
          {{ item.name }}
        </div>
        <div v-show="resList.length === 0" class="tip">
          <span v-if="support.searchState[support.indexSearch] !== 'dosearch'"
            >暂无相关内容</span
          >
          <span v-else>{{ "正在搜索 " + support.searchContr.tempStr }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      str: "",
      lastStr: "",
      resList: [
        { name: "第一条数据" },
        { name: "第二条数据" },
        { name: "第三条数据" },
        { name: "第四条数据" }
      ],
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
        blurClick: false
      },
      targetDom: ["searcher-input"],
      searchFocus: false
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
    getSearchResult(index, str) {
      this.resList = [];
      try {
        setTimeout(() => {
          console.log("str::::::", str, index); // 入参搜索词
          if (this.support.searchState[index] === "cancel") return;
          this.support.searchState[index] = "done";
          this.resList = [
            { name: "第一条数据" },
            { name: "第二条数据" },
            { name: "第三条数据" },
            { name: "第四条数据" }
          ];
        }, 1000);
      } catch (error) {
        this.support.searchState[index] = "error";
      }
    },
    focusblur() {
      this.doSearch(this.support.searchContr.tempStr);
      this.searchFocus = true;
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
      this.searchFocus = false;
      if (this.support.blurClick === true) {
        this.support.blurClick = false;
        return;
      }
      console.log("关闭搜索结果");

      this.support.inputFocus = false;
      this.clearSearch();
    },
    selectItem(item) {
      this.support.searchContr.tempStr = this.lastStr = this.str = item.name;
      this.clearSearch();
      this.support.inputFocus = false;
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
    .res-list {
      padding: 8px 0;
      background: rgb(240, 234, 234);
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
      overflow-y: auto;
      box-sizing: border-box;
      max-height: 48px 0;
      .res-item {
        line-height: 40px;
        cursor: pointer;
        &:hover {
          background-color: #e9cccc;
        }
      }
    }
    .tip {
      padding: 8px 16px;
      color: #9b9b9b;
    }
    &::after {
      position: absolute;
      box-sizing: border-box;
      top: -16px;
      left: 46px;
      content: "";
      border-top: 8px solid transparent;
      border-bottom: 8px solid rgb(240, 234, 234);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
    }
  }
}
</style>

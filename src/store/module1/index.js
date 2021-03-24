import state from "./state";
import mutations from "./mutations";
let getters = {};
let actions = {};
export default {
  namespaced: true, // 命名空间，辅助函数用法...mapState("module1", ["title"])
  state,
  mutations,
  getters,
  actions
};

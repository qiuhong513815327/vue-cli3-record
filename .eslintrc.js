module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 数组和对象键值对末了一个逗号， never参数：不能带末端的逗号, always参数：必需带末端的逗号，
    // always-multiline：多行形式必需带逗号，单行形式不能带逗号
    "comma-dangle": [2, "never"]
  }
};

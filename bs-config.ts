module.exports = {
  proxy: "localhost:8000",
  files: ["**/*.css", "**/*.pug", "**/*.ts"],
  ignore: ["node_modules"],
  reloadDelay: 10,
  ui: false,
  notify: false,
  port: 3000,
};

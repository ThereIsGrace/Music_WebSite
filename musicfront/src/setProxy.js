const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  console.log("proxy test");
  app.use(proxy("/", {target: "http://localhost:8094/"}));
};

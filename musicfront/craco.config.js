const { resolve } = require("node:path");
const fs = require("fs");

module.exports = {
  webpack: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  //  devServer: {
  //    https: {
  //      key: fs.readFileSync("D:/test/key.pem"),
  //      cert: fs.readFileSync("D:/test/cert.pem")
  //    }
  //  }
};

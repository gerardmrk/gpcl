const { loadConfigSync } = require("./lib");

const config = loadConfigSync();

console.log(config);

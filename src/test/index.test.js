const path = require("node:path");
const sassTrue = require("sass-true");

const styleFile = path.join(__dirname, "_style.scss");

sassTrue.runSass({ describe, it }, styleFile);

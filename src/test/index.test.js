const path = require("node:path");
const sassTrue = require("sass-true");

const testStyle = path.join(__dirname, "_index.scss");

sassTrue.runSass({ describe, it }, testStyle);

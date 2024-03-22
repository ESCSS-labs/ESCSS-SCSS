const path = require("node:path");
const sassTrue = require("sass-true");

const sassFile = path.join(__dirname, "_test.scss");

sassTrue.runSass({ describe, it }, sassFile);

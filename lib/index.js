const fs = require("fs");

exports.readFileNoTrim = file => fs.readFileSync(file, "utf-8");

exports.readFile = file => exports.readFileNoTrim(file).trim();

exports.readLines = file => exports.readFile(file).split("\n");

exports.parseInt = n => parseInt(n, 10);

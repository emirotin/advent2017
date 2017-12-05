const fs = require("fs");

exports.readFile = file => fs.readFileSync(file, "utf-8").trim();

exports.readLines = file => exports.readFile(file).split("\n");

exports.parseInt = n => parseInt(n, 10);

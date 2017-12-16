const { readFile, parseInt } = require("../lib");

const parse = s => {
  const command = s[0];
  let payload = s.slice(1);
  switch (command) {
    case "s":
      payload = parseInt(payload);
      break;
    case "x":
      payload = payload.split("/").map(parseInt);
      break;
    case "p":
      payload = payload.split("/");
      break;
    default:
      throw new Error("WTF");
  }
  return { command, payload };
};

const a = "a".charCodeAt(0);
const L = 16;
let arr = Array.from({ length: L }, (_, i) => String.fromCharCode(i + a));
let shift = 0;

const input = readFile("./input")
  .split(",")
  .map(parse);

const spin = x => {
  shift = (shift + x) % L;
};

const swap = (i, j) => {
  i = (i + L) % L;
  j = (j + L) % L;
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
};

const run = () => {
  for (const { command, payload } of input) {
    switch (command) {
      case "s":
        spin(payload);
        break;
      case "x":
        swap(...payload.map(i => i - shift));
        break;
      case "p":
        swap(...payload.map(p => arr.indexOf(p)));
        break;

      default:
        throw new Error("WTF");
    }
  }
};

const ITER = 1e9;

for (let i = 0; i < ITER; i++) run();

arr = arr.slice(arr.length - shift).concat(arr.slice(0, arr.length - shift));

console.log(arr.join(""));

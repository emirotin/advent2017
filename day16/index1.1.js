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

const swap = (x, y) => {
  x = (x + L) % L;
  y = (y + L) % L;
  const t = arr[x];
  arr[x] = arr[y];
  arr[y] = t;
};

for (const { command, payload } of input) {
  switch (command) {
    case "s":
      spin(payload);
      break;
    case "x":
      swap(...payload.map(x => x - shift));
      break;
    case "p":
      swap(...payload.map(p => arr.indexOf(p)));
      break;

    default:
      throw new Error("WTF");
  }
}

arr = arr.slice(arr.length - shift).concat(arr.slice(0, arr.length - shift));

console.log(arr.join(""));

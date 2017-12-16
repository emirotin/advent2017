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

const nonSpins = [];
for (let { command, payload } of input) {
  if (command === "s") {
    shift = (shift + payload) % L;
    continue;
  }

  if (command === "x") {
    payload = payload.map(x => (x - shift + L) % L);
  }

  nonSpins.push({ command, x: payload[0], y: payload[1] });
}

const swap = (x, y) => {
  const t = arr[x];
  arr[x] = arr[y];
  arr[y] = t;
};

for (const { command, x, y } of nonSpins) {
  switch (command) {
    case "x":
      swap(x, y);
      break;
    case "p":
      swap(arr.indexOf(x), arr.indexOf(y));
      break;
    default:
      throw new Error("WTF");
  }
}

arr = arr.slice(arr.length - shift).concat(arr.slice(0, arr.length - shift));

console.log(arr.join(""));

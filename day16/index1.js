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
let arr = Array.from({ length: 16 }, (_, i) => String.fromCharCode(i + a));

const input = readFile("./input")
  .split(",")
  .map(parse);

const spin = x => {
  arr = arr.slice(arr.length - x).concat(arr.slice(0, arr.length - x));
};

const swap = (x, y) => {
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
      swap(...payload);
      break;
    case "p":
      swap(...payload.map(p => arr.indexOf(p)));
      break;

    default:
      throw new Error("WTF");
  }
}

console.log(arr.join(""));

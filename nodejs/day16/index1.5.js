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
    nonSpins.push({
      command,
      x: (payload[0] - shift + L) % L,
      y: (payload[1] - shift + L) % L
    });
  } else {
    nonSpins.push({
      command,
      x: payload[0],
      y: payload[1]
    });
  }
}

const hash = {};
arr.forEach((el, i) => (hash[el] = i));

for (const { command, x, y } of nonSpins) {
  if (command === "x") {
    const t1 = arr[x];
    const t2 = arr[y];
    arr[x] = t2;
    arr[y] = t1;
    hash[t2] = x;
    hash[t1] = y;
  } else {
    const t1 = hash[x];
    const t2 = hash[y];
    hash[x] = t2;
    hash[y] = t1;
    arr[t2] = x;
    arr[t1] = y;
  }
}

arr = arr.slice(arr.length - shift).concat(arr.slice(0, arr.length - shift));

console.log(arr.join(""));

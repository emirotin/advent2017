const STEP = 316;
const MAX = 2017;

const a = [0];
let i = 0;

for (let v = 1; v <= MAX; v++) {
  i = (i + STEP) % v + 1;
  a.splice(i, 0, v);
}

console.log(a[i + 1]);

const STEP = 316;
const MAX = 5e7;

let i = 0;
let zeroIndex = 0;
let ans = null;

for (let v = 1; v <= MAX; v++) {
  i = (i + STEP) % v;
  if (i < zeroIndex) {
    zeroIndex++;
  } else if (i === zeroIndex) {
    ans = v;
  }
  i += 1;
}

console.log(ans);

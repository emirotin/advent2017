let h = 0;

const low = 106500;
const high = 106500 + 17000;

const seive = Array.from({ length: high + 1 }, () => true);

seive[0] = false;
seive[1] = false;
let i = 2;

while (i <= high) {
  let j = 2 * i;
  while (j <= high) {
    seive[j] = false;
    j += i;
  }
  do {
    i++;
  } while (i <= high && !seive[i]);
}

let res = 0;
for (let i = low; i <= high; i += 17) {
  if (!seive[i]) {
    res++;
  }
}

console.log(res);

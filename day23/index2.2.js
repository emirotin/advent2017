// rewrite with for loops and local scope vars

let h = 0;

const isInt = n => n === ~~n;

for (let b = 106500; b <= 106500 + 17000; b += 17) {
  const shouldInc = false;

  for (let d = 2; d <= b; d++) {
    for (let e = 2; e <= b; e++) {
      if (d * e == b) shouldInc = true;
    }
  }

  if (shouldInc) h++;
}

let h = 0;

const isInt = n => n === ~~n;

for (let b = 106500; b <= 106500 + 17000; b += 17) {
  const shouldInc = false;

  // no we see that what we actually try to do is detect if
  // b is prime or not
  // if it's not prime (so there are two multipliers e and d between 2 and b)
  // then we increment h
  for (let d = 2; d <= b; d++) {
    const e = b / d;
    // reduce the inner loop
    if (e >= 2 && isInt(e)) shouldInc = true;
  }

  if (shouldInc) h++;
}

let h = 0;

const isPrime = () => false /* will implement later */;

// now this is effectively h = 1000 - number of primes between
// 106500 and 106500 + 17000 step 17
for (let b = 106500; b <= 106500 + 17000; b += 17) {
  const shouldInc = !isPrime(b);

  if (shouldInc) h++;
}

let a = 1,
  b = 0,
  c = 0,
  d = 0,
  e = 0,
  f = 0,
  g = 0,
  h = 0;

b = 106500; // 00-05
c = b + 17000; // 06-07

// 26-31
while (b != c) {
  f = 1; // 08
  d = 2; // 09

  // 21-23
  while (d != b) {
    e = 2; // 10

    // 17-19
    while (e != b) {
      g = d * e - b; // 11-13
      if (g == 0) f = 0;
      e++; // 16
    }

    d++; // 20
  }

  if (f == 0) h++; // 24-25
  b += 17; // 26-31
}

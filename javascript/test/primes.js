function primes(n) {
  for (let i = 2; i <= n; i++) {
    if (!isPrime(i)) continue;
    console.log(i);
  }
}

function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

primes(100);
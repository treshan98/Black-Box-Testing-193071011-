import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class testprimenumber {
    @Test
    public void primenumber() {
        PrimeNumber primeNumber = new PrimeNumber();
        boolean results = primeNumber.checkForPrime(7);
        assertEquals(true, results);
    }

    @Test
    public void primenumber2() {
        PrimeNumber primeNumber = new PrimeNumber();
        boolean results = primeNumber.checkForPrime(8);
        assertEquals(false, results);
    }

    @Test
    public void primenumber3() {
        PrimeNumber primeNumber = new PrimeNumber();
        boolean results = primeNumber.checkForPrime(9);
        assertEquals(false, results);
    }

    @Test
    public void primenumber4() {
        PrimeNumber primeNumber = new PrimeNumber();
        boolean results = primeNumber.checkForPrime(89);
        assertEquals(true, results);
    }

}

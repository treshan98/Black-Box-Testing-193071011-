import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class testleapyear {
    @Test
    public void TestcheckLeapYear1() {
        LeapYear leapYear = new LeapYear();
        boolean rslt = leapYear.checkLeapYear(2001);
        assertEquals(false, rslt);
    }

    @Test
    public void TestcheckLeapYear2() {
        LeapYear leapYear = new LeapYear();
        boolean rslt = leapYear.checkLeapYear(1912);
        assertEquals(true, rslt);
    }

    @Test
    public void TestcheckLeapYear3() {
        LeapYear leapYear = new LeapYear();
        boolean rslt = leapYear.checkLeapYear(2003);
        assertEquals(false, rslt);
    }

    @Test
    public void TestcheckLeapYear4() {
        LeapYear leapYear = new LeapYear();
        boolean rslt = leapYear.checkLeapYear(2012);
        assertEquals(true, rslt);
    }

}

package helpers;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;

class CurrentDateTest {

    @Test
    void generateDate() {
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDateTime now = LocalDateTime.now();

        //
        String result =  dateFormat.format(now);
        String expectedResult = dateFormat.format(now);

        //
        assertEquals(expectedResult, result);

    }
}
package helpers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CurrentDate {

    public String generateDate() {
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDateTime now = LocalDateTime.now();
        return dateFormat.format(now);
    }


}

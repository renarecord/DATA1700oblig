package DATA1700oblig;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class OslometApplicationTests {

    @Test
    void contextLoads() {
        String epostRegex = "[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]+";
        String email = "myemail@something.no";

        System.out.println("Hello world.");
        System.out.println(email.matches(epostRegex));
    }

}

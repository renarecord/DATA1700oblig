package DATA1700oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class BillettController {
    @Autowired
    private BillettRepository billettRepository;

    @PostMapping({"/lagre"})
    public void lagreBilletter(Billett innBillett) {
        billettRepository.save(innBillett);
    }

    @GetMapping({"/hentAlle"})
    public List<Billett> hentAlle() {
        return billettRepository.findAll().stream().sorted(Comparator.comparing(Billett::getEtternavn)).
                collect(Collectors.toList());
    }

    @GetMapping({"/slettAlle"})
    public void slettAlle() {
        billettRepository.deleteAll();
    }
}

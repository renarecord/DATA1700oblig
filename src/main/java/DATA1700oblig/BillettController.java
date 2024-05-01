package DATA1700oblig;

import jakarta.servlet.http.HttpServletResponse;
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

    private void validerInput(Billett billett) {
        if (billett.getFilm().equals( "Velg film her")) {
            throw new IllegalArgumentException("Gyldig film må velges, fikk input " + billett.getFilm());
        }
        if (billett.getAntall() < 1) {
            throw new IllegalArgumentException("Gyldig antall må velges, fikk input " + billett.getAntall());
        }
        String digitsRegex = "\\d+";
        if (billett.getFornavn() == null || billett.getFornavn().matches(digitsRegex) || billett.getFornavn().isEmpty()) {
            throw new IllegalArgumentException("Gyldig fornavn må sendes inn, fikk input " + billett.getFornavn());
        }
        if (billett.getEtternavn() == null || billett.getEtternavn().matches(digitsRegex) || billett.getEtternavn().isEmpty()) {
            throw new IllegalArgumentException("Gyldig fornavn må sendes inn, fikk input " + billett.getFornavn());
        }
        if (billett.getTelefonnr() == null || billett.getTelefonnr().length() != 8 || !billett.getTelefonnr().matches(digitsRegex)) {
            throw new IllegalArgumentException("Gyldig telefonnr må sendes inn, fikk input " + billett.getTelefonnr());
        }
        String epostRegex = "[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]+";
        if (billett.getEpost() == null || !billett.getEpost().matches(epostRegex)) {
            throw new IllegalArgumentException("Gyldig epost må sendes inn, fikk input " + billett.getEpost());
        }
    }

    @PostMapping({"/lagre"})
    public void lagreBilletter(Billett innBillett) {
        validerInput(innBillett);
        billettRepository.save(innBillett);
    }

    @PostMapping({"/oppdater"})
    public void oppdaterBilletter(Billett innBillett) {
        validerInput(innBillett);
        billettRepository.save(innBillett);
    }

    @GetMapping({"/hentAlle"})
    public List<Billett> hentAlle() {
        return billettRepository.findAll().stream().sorted(Comparator.comparing(Billett::getEtternavn)).
                collect(Collectors.toList());
    }

    @PostMapping({"/slett"})
    public void slett(Billett innBillett) {
        billettRepository.delete(innBillett);
    }

    @GetMapping({"/slettAlle"})
    public void slettAlle() {
        billettRepository.deleteAll();
    }
}

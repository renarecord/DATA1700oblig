package DATA1700oblig;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillettRepository extends JpaRepository<Billett,Long> {
}

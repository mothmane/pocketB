package ma.oth.repository;

import ma.oth.domain.Transfert;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Transfert entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransfertRepository extends JpaRepository<Transfert, Long> {

}

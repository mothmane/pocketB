package ma.oth.repository;

import ma.oth.domain.Credit;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Credit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {

}

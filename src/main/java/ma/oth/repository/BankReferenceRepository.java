package ma.oth.repository;

import ma.oth.domain.BankReference;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BankReference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankReferenceRepository extends JpaRepository<BankReference, Long> {

}

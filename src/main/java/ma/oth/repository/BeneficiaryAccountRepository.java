package ma.oth.repository;

import ma.oth.domain.BeneficiaryAccount;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BeneficiaryAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BeneficiaryAccountRepository extends JpaRepository<BeneficiaryAccount, Long> {

}

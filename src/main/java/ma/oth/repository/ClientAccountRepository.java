package ma.oth.repository;

import ma.oth.domain.ClientAccount;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ClientAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientAccountRepository extends JpaRepository<ClientAccount, Long> {

}

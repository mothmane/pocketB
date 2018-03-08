package ma.oth.repository;

import ma.oth.domain.RIB;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RIB entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RIBRepository extends JpaRepository<RIB, Long> {

}

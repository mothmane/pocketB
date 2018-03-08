package ma.oth.repository;

import ma.oth.domain.CapacityDetails;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CapacityDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CapacityDetailsRepository extends JpaRepository<CapacityDetails, Long> {

}

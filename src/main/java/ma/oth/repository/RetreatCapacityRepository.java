package ma.oth.repository;

import ma.oth.domain.RetreatCapacity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RetreatCapacity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RetreatCapacityRepository extends JpaRepository<RetreatCapacity, Long> {

}

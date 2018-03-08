package ma.oth.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.oth.domain.CapacityDetails;

import ma.oth.repository.CapacityDetailsRepository;
import ma.oth.web.rest.errors.BadRequestAlertException;
import ma.oth.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CapacityDetails.
 */
@RestController
@RequestMapping("/api")
public class CapacityDetailsResource {

    private final Logger log = LoggerFactory.getLogger(CapacityDetailsResource.class);

    private static final String ENTITY_NAME = "capacityDetails";

    private final CapacityDetailsRepository capacityDetailsRepository;

    public CapacityDetailsResource(CapacityDetailsRepository capacityDetailsRepository) {
        this.capacityDetailsRepository = capacityDetailsRepository;
    }

    /**
     * POST  /capacity-details : Create a new capacityDetails.
     *
     * @param capacityDetails the capacityDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new capacityDetails, or with status 400 (Bad Request) if the capacityDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/capacity-details")
    @Timed
    public ResponseEntity<CapacityDetails> createCapacityDetails(@RequestBody CapacityDetails capacityDetails) throws URISyntaxException {
        log.debug("REST request to save CapacityDetails : {}", capacityDetails);
        if (capacityDetails.getId() != null) {
            throw new BadRequestAlertException("A new capacityDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CapacityDetails result = capacityDetailsRepository.save(capacityDetails);
        return ResponseEntity.created(new URI("/api/capacity-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /capacity-details : Updates an existing capacityDetails.
     *
     * @param capacityDetails the capacityDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated capacityDetails,
     * or with status 400 (Bad Request) if the capacityDetails is not valid,
     * or with status 500 (Internal Server Error) if the capacityDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/capacity-details")
    @Timed
    public ResponseEntity<CapacityDetails> updateCapacityDetails(@RequestBody CapacityDetails capacityDetails) throws URISyntaxException {
        log.debug("REST request to update CapacityDetails : {}", capacityDetails);
        if (capacityDetails.getId() == null) {
            return createCapacityDetails(capacityDetails);
        }
        CapacityDetails result = capacityDetailsRepository.save(capacityDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, capacityDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /capacity-details : get all the capacityDetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of capacityDetails in body
     */
    @GetMapping("/capacity-details")
    @Timed
    public List<CapacityDetails> getAllCapacityDetails() {
        log.debug("REST request to get all CapacityDetails");
        return capacityDetailsRepository.findAll();
        }

    /**
     * GET  /capacity-details/:id : get the "id" capacityDetails.
     *
     * @param id the id of the capacityDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the capacityDetails, or with status 404 (Not Found)
     */
    @GetMapping("/capacity-details/{id}")
    @Timed
    public ResponseEntity<CapacityDetails> getCapacityDetails(@PathVariable Long id) {
        log.debug("REST request to get CapacityDetails : {}", id);
        CapacityDetails capacityDetails = capacityDetailsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(capacityDetails));
    }

    /**
     * DELETE  /capacity-details/:id : delete the "id" capacityDetails.
     *
     * @param id the id of the capacityDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/capacity-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteCapacityDetails(@PathVariable Long id) {
        log.debug("REST request to delete CapacityDetails : {}", id);
        capacityDetailsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

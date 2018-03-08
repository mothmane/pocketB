package ma.oth.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.oth.domain.RetreatCapacity;

import ma.oth.repository.RetreatCapacityRepository;
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
 * REST controller for managing RetreatCapacity.
 */
@RestController
@RequestMapping("/api")
public class RetreatCapacityResource {

    private final Logger log = LoggerFactory.getLogger(RetreatCapacityResource.class);

    private static final String ENTITY_NAME = "retreatCapacity";

    private final RetreatCapacityRepository retreatCapacityRepository;

    public RetreatCapacityResource(RetreatCapacityRepository retreatCapacityRepository) {
        this.retreatCapacityRepository = retreatCapacityRepository;
    }

    /**
     * POST  /retreat-capacities : Create a new retreatCapacity.
     *
     * @param retreatCapacity the retreatCapacity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new retreatCapacity, or with status 400 (Bad Request) if the retreatCapacity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/retreat-capacities")
    @Timed
    public ResponseEntity<RetreatCapacity> createRetreatCapacity(@RequestBody RetreatCapacity retreatCapacity) throws URISyntaxException {
        log.debug("REST request to save RetreatCapacity : {}", retreatCapacity);
        if (retreatCapacity.getId() != null) {
            throw new BadRequestAlertException("A new retreatCapacity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RetreatCapacity result = retreatCapacityRepository.save(retreatCapacity);
        return ResponseEntity.created(new URI("/api/retreat-capacities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /retreat-capacities : Updates an existing retreatCapacity.
     *
     * @param retreatCapacity the retreatCapacity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated retreatCapacity,
     * or with status 400 (Bad Request) if the retreatCapacity is not valid,
     * or with status 500 (Internal Server Error) if the retreatCapacity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/retreat-capacities")
    @Timed
    public ResponseEntity<RetreatCapacity> updateRetreatCapacity(@RequestBody RetreatCapacity retreatCapacity) throws URISyntaxException {
        log.debug("REST request to update RetreatCapacity : {}", retreatCapacity);
        if (retreatCapacity.getId() == null) {
            return createRetreatCapacity(retreatCapacity);
        }
        RetreatCapacity result = retreatCapacityRepository.save(retreatCapacity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, retreatCapacity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /retreat-capacities : get all the retreatCapacities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of retreatCapacities in body
     */
    @GetMapping("/retreat-capacities")
    @Timed
    public List<RetreatCapacity> getAllRetreatCapacities() {
        log.debug("REST request to get all RetreatCapacities");
        return retreatCapacityRepository.findAll();
        }

    /**
     * GET  /retreat-capacities/:id : get the "id" retreatCapacity.
     *
     * @param id the id of the retreatCapacity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the retreatCapacity, or with status 404 (Not Found)
     */
    @GetMapping("/retreat-capacities/{id}")
    @Timed
    public ResponseEntity<RetreatCapacity> getRetreatCapacity(@PathVariable Long id) {
        log.debug("REST request to get RetreatCapacity : {}", id);
        RetreatCapacity retreatCapacity = retreatCapacityRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(retreatCapacity));
    }

    /**
     * DELETE  /retreat-capacities/:id : delete the "id" retreatCapacity.
     *
     * @param id the id of the retreatCapacity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/retreat-capacities/{id}")
    @Timed
    public ResponseEntity<Void> deleteRetreatCapacity(@PathVariable Long id) {
        log.debug("REST request to delete RetreatCapacity : {}", id);
        retreatCapacityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

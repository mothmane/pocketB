package ma.oth.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.oth.domain.RIB;

import ma.oth.repository.RIBRepository;
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
 * REST controller for managing RIB.
 */
@RestController
@RequestMapping("/api")
public class RIBResource {

    private final Logger log = LoggerFactory.getLogger(RIBResource.class);

    private static final String ENTITY_NAME = "rIB";

    private final RIBRepository rIBRepository;

    public RIBResource(RIBRepository rIBRepository) {
        this.rIBRepository = rIBRepository;
    }

    /**
     * POST  /ribs : Create a new rIB.
     *
     * @param rIB the rIB to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rIB, or with status 400 (Bad Request) if the rIB has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ribs")
    @Timed
    public ResponseEntity<RIB> createRIB(@RequestBody RIB rIB) throws URISyntaxException {
        log.debug("REST request to save RIB : {}", rIB);
        if (rIB.getId() != null) {
            throw new BadRequestAlertException("A new rIB cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RIB result = rIBRepository.save(rIB);
        return ResponseEntity.created(new URI("/api/ribs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ribs : Updates an existing rIB.
     *
     * @param rIB the rIB to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rIB,
     * or with status 400 (Bad Request) if the rIB is not valid,
     * or with status 500 (Internal Server Error) if the rIB couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ribs")
    @Timed
    public ResponseEntity<RIB> updateRIB(@RequestBody RIB rIB) throws URISyntaxException {
        log.debug("REST request to update RIB : {}", rIB);
        if (rIB.getId() == null) {
            return createRIB(rIB);
        }
        RIB result = rIBRepository.save(rIB);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rIB.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ribs : get all the rIBS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rIBS in body
     */
    @GetMapping("/ribs")
    @Timed
    public List<RIB> getAllRIBS() {
        log.debug("REST request to get all RIBS");
        return rIBRepository.findAll();
        }

    /**
     * GET  /ribs/:id : get the "id" rIB.
     *
     * @param id the id of the rIB to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rIB, or with status 404 (Not Found)
     */
    @GetMapping("/ribs/{id}")
    @Timed
    public ResponseEntity<RIB> getRIB(@PathVariable Long id) {
        log.debug("REST request to get RIB : {}", id);
        RIB rIB = rIBRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rIB));
    }

    /**
     * DELETE  /ribs/:id : delete the "id" rIB.
     *
     * @param id the id of the rIB to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ribs/{id}")
    @Timed
    public ResponseEntity<Void> deleteRIB(@PathVariable Long id) {
        log.debug("REST request to delete RIB : {}", id);
        rIBRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

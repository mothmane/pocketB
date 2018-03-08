package ma.oth.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.oth.domain.Transfert;

import ma.oth.repository.TransfertRepository;
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
 * REST controller for managing Transfert.
 */
@RestController
@RequestMapping("/api")
public class TransfertResource {

    private final Logger log = LoggerFactory.getLogger(TransfertResource.class);

    private static final String ENTITY_NAME = "transfert";

    private final TransfertRepository transfertRepository;

    public TransfertResource(TransfertRepository transfertRepository) {
        this.transfertRepository = transfertRepository;
    }

    /**
     * POST  /transferts : Create a new transfert.
     *
     * @param transfert the transfert to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transfert, or with status 400 (Bad Request) if the transfert has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transferts")
    @Timed
    public ResponseEntity<Transfert> createTransfert(@RequestBody Transfert transfert) throws URISyntaxException {
        log.debug("REST request to save Transfert : {}", transfert);
        if (transfert.getId() != null) {
            throw new BadRequestAlertException("A new transfert cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transfert result = transfertRepository.save(transfert);
        return ResponseEntity.created(new URI("/api/transferts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transferts : Updates an existing transfert.
     *
     * @param transfert the transfert to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transfert,
     * or with status 400 (Bad Request) if the transfert is not valid,
     * or with status 500 (Internal Server Error) if the transfert couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transferts")
    @Timed
    public ResponseEntity<Transfert> updateTransfert(@RequestBody Transfert transfert) throws URISyntaxException {
        log.debug("REST request to update Transfert : {}", transfert);
        if (transfert.getId() == null) {
            return createTransfert(transfert);
        }
        Transfert result = transfertRepository.save(transfert);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transfert.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transferts : get all the transferts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transferts in body
     */
    @GetMapping("/transferts")
    @Timed
    public List<Transfert> getAllTransferts() {
        log.debug("REST request to get all Transferts");
        return transfertRepository.findAll();
        }

    /**
     * GET  /transferts/:id : get the "id" transfert.
     *
     * @param id the id of the transfert to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transfert, or with status 404 (Not Found)
     */
    @GetMapping("/transferts/{id}")
    @Timed
    public ResponseEntity<Transfert> getTransfert(@PathVariable Long id) {
        log.debug("REST request to get Transfert : {}", id);
        Transfert transfert = transfertRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transfert));
    }

    /**
     * DELETE  /transferts/:id : delete the "id" transfert.
     *
     * @param id the id of the transfert to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transferts/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransfert(@PathVariable Long id) {
        log.debug("REST request to delete Transfert : {}", id);
        transfertRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

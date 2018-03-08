package ma.oth.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.oth.domain.BankReference;

import ma.oth.repository.BankReferenceRepository;
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
 * REST controller for managing BankReference.
 */
@RestController
@RequestMapping("/api")
public class BankReferenceResource {

    private final Logger log = LoggerFactory.getLogger(BankReferenceResource.class);

    private static final String ENTITY_NAME = "bankReference";

    private final BankReferenceRepository bankReferenceRepository;

    public BankReferenceResource(BankReferenceRepository bankReferenceRepository) {
        this.bankReferenceRepository = bankReferenceRepository;
    }

    /**
     * POST  /bank-references : Create a new bankReference.
     *
     * @param bankReference the bankReference to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bankReference, or with status 400 (Bad Request) if the bankReference has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bank-references")
    @Timed
    public ResponseEntity<BankReference> createBankReference(@RequestBody BankReference bankReference) throws URISyntaxException {
        log.debug("REST request to save BankReference : {}", bankReference);
        if (bankReference.getId() != null) {
            throw new BadRequestAlertException("A new bankReference cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BankReference result = bankReferenceRepository.save(bankReference);
        return ResponseEntity.created(new URI("/api/bank-references/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bank-references : Updates an existing bankReference.
     *
     * @param bankReference the bankReference to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bankReference,
     * or with status 400 (Bad Request) if the bankReference is not valid,
     * or with status 500 (Internal Server Error) if the bankReference couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bank-references")
    @Timed
    public ResponseEntity<BankReference> updateBankReference(@RequestBody BankReference bankReference) throws URISyntaxException {
        log.debug("REST request to update BankReference : {}", bankReference);
        if (bankReference.getId() == null) {
            return createBankReference(bankReference);
        }
        BankReference result = bankReferenceRepository.save(bankReference);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bankReference.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bank-references : get all the bankReferences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bankReferences in body
     */
    @GetMapping("/bank-references")
    @Timed
    public List<BankReference> getAllBankReferences() {
        log.debug("REST request to get all BankReferences");
        return bankReferenceRepository.findAll();
        }

    /**
     * GET  /bank-references/:id : get the "id" bankReference.
     *
     * @param id the id of the bankReference to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bankReference, or with status 404 (Not Found)
     */
    @GetMapping("/bank-references/{id}")
    @Timed
    public ResponseEntity<BankReference> getBankReference(@PathVariable Long id) {
        log.debug("REST request to get BankReference : {}", id);
        BankReference bankReference = bankReferenceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bankReference));
    }

    /**
     * DELETE  /bank-references/:id : delete the "id" bankReference.
     *
     * @param id the id of the bankReference to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bank-references/{id}")
    @Timed
    public ResponseEntity<Void> deleteBankReference(@PathVariable Long id) {
        log.debug("REST request to delete BankReference : {}", id);
        bankReferenceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

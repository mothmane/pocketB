package ma.oth.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.oth.domain.BeneficiaryAccount;

import ma.oth.repository.BeneficiaryAccountRepository;
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
 * REST controller for managing BeneficiaryAccount.
 */
@RestController
@RequestMapping("/api")
public class BeneficiaryAccountResource {

    private final Logger log = LoggerFactory.getLogger(BeneficiaryAccountResource.class);

    private static final String ENTITY_NAME = "beneficiaryAccount";

    private final BeneficiaryAccountRepository beneficiaryAccountRepository;

    public BeneficiaryAccountResource(BeneficiaryAccountRepository beneficiaryAccountRepository) {
        this.beneficiaryAccountRepository = beneficiaryAccountRepository;
    }

    /**
     * POST  /beneficiary-accounts : Create a new beneficiaryAccount.
     *
     * @param beneficiaryAccount the beneficiaryAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new beneficiaryAccount, or with status 400 (Bad Request) if the beneficiaryAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/beneficiary-accounts")
    @Timed
    public ResponseEntity<BeneficiaryAccount> createBeneficiaryAccount(@RequestBody BeneficiaryAccount beneficiaryAccount) throws URISyntaxException {
        log.debug("REST request to save BeneficiaryAccount : {}", beneficiaryAccount);
        if (beneficiaryAccount.getId() != null) {
            throw new BadRequestAlertException("A new beneficiaryAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BeneficiaryAccount result = beneficiaryAccountRepository.save(beneficiaryAccount);
        return ResponseEntity.created(new URI("/api/beneficiary-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /beneficiary-accounts : Updates an existing beneficiaryAccount.
     *
     * @param beneficiaryAccount the beneficiaryAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated beneficiaryAccount,
     * or with status 400 (Bad Request) if the beneficiaryAccount is not valid,
     * or with status 500 (Internal Server Error) if the beneficiaryAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/beneficiary-accounts")
    @Timed
    public ResponseEntity<BeneficiaryAccount> updateBeneficiaryAccount(@RequestBody BeneficiaryAccount beneficiaryAccount) throws URISyntaxException {
        log.debug("REST request to update BeneficiaryAccount : {}", beneficiaryAccount);
        if (beneficiaryAccount.getId() == null) {
            return createBeneficiaryAccount(beneficiaryAccount);
        }
        BeneficiaryAccount result = beneficiaryAccountRepository.save(beneficiaryAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, beneficiaryAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /beneficiary-accounts : get all the beneficiaryAccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of beneficiaryAccounts in body
     */
    @GetMapping("/beneficiary-accounts")
    @Timed
    public List<BeneficiaryAccount> getAllBeneficiaryAccounts() {
        log.debug("REST request to get all BeneficiaryAccounts");
        return beneficiaryAccountRepository.findAll();
        }

    /**
     * GET  /beneficiary-accounts/:id : get the "id" beneficiaryAccount.
     *
     * @param id the id of the beneficiaryAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the beneficiaryAccount, or with status 404 (Not Found)
     */
    @GetMapping("/beneficiary-accounts/{id}")
    @Timed
    public ResponseEntity<BeneficiaryAccount> getBeneficiaryAccount(@PathVariable Long id) {
        log.debug("REST request to get BeneficiaryAccount : {}", id);
        BeneficiaryAccount beneficiaryAccount = beneficiaryAccountRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(beneficiaryAccount));
    }

    /**
     * DELETE  /beneficiary-accounts/:id : delete the "id" beneficiaryAccount.
     *
     * @param id the id of the beneficiaryAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/beneficiary-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteBeneficiaryAccount(@PathVariable Long id) {
        log.debug("REST request to delete BeneficiaryAccount : {}", id);
        beneficiaryAccountRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

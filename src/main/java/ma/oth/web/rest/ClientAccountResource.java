package ma.oth.web.rest;

import com.codahale.metrics.annotation.Timed;
import ma.oth.domain.ClientAccount;

import ma.oth.repository.ClientAccountRepository;
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
 * REST controller for managing ClientAccount.
 */
@RestController
@RequestMapping("/api")
public class ClientAccountResource {

    private final Logger log = LoggerFactory.getLogger(ClientAccountResource.class);

    private static final String ENTITY_NAME = "clientAccount";

    private final ClientAccountRepository clientAccountRepository;

    public ClientAccountResource(ClientAccountRepository clientAccountRepository) {
        this.clientAccountRepository = clientAccountRepository;
    }

    /**
     * POST  /client-accounts : Create a new clientAccount.
     *
     * @param clientAccount the clientAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clientAccount, or with status 400 (Bad Request) if the clientAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/client-accounts")
    @Timed
    public ResponseEntity<ClientAccount> createClientAccount(@RequestBody ClientAccount clientAccount) throws URISyntaxException {
        log.debug("REST request to save ClientAccount : {}", clientAccount);
        if (clientAccount.getId() != null) {
            throw new BadRequestAlertException("A new clientAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientAccount result = clientAccountRepository.save(clientAccount);
        return ResponseEntity.created(new URI("/api/client-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /client-accounts : Updates an existing clientAccount.
     *
     * @param clientAccount the clientAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clientAccount,
     * or with status 400 (Bad Request) if the clientAccount is not valid,
     * or with status 500 (Internal Server Error) if the clientAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/client-accounts")
    @Timed
    public ResponseEntity<ClientAccount> updateClientAccount(@RequestBody ClientAccount clientAccount) throws URISyntaxException {
        log.debug("REST request to update ClientAccount : {}", clientAccount);
        if (clientAccount.getId() == null) {
            return createClientAccount(clientAccount);
        }
        ClientAccount result = clientAccountRepository.save(clientAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clientAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /client-accounts : get all the clientAccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clientAccounts in body
     */
    @GetMapping("/client-accounts")
    @Timed
    public List<ClientAccount> getAllClientAccounts() {
        log.debug("REST request to get all ClientAccounts");
        return clientAccountRepository.findAll();
        }

    /**
     * GET  /client-accounts/:id : get the "id" clientAccount.
     *
     * @param id the id of the clientAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clientAccount, or with status 404 (Not Found)
     */
    @GetMapping("/client-accounts/{id}")
    @Timed
    public ResponseEntity<ClientAccount> getClientAccount(@PathVariable Long id) {
        log.debug("REST request to get ClientAccount : {}", id);
        ClientAccount clientAccount = clientAccountRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(clientAccount));
    }

    /**
     * DELETE  /client-accounts/:id : delete the "id" clientAccount.
     *
     * @param id the id of the clientAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/client-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteClientAccount(@PathVariable Long id) {
        log.debug("REST request to delete ClientAccount : {}", id);
        clientAccountRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.ClientAccount;
import ma.oth.repository.ClientAccountRepository;
import ma.oth.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static ma.oth.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ma.oth.domain.enumeration.AccountType;
/**
 * Test class for the ClientAccountResource REST controller.
 *
 * @see ClientAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class ClientAccountResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_SOLDE = 1D;
    private static final Double UPDATED_SOLDE = 2D;

    private static final LocalDate DEFAULT_LAST_LOCAL_DATE_CHECK = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_LOCAL_DATE_CHECK = LocalDate.now(ZoneId.systemDefault());

    private static final AccountType DEFAULT_TYPE = AccountType.CHECKING;
    private static final AccountType UPDATED_TYPE = AccountType.SAVINGS;

    @Autowired
    private ClientAccountRepository clientAccountRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClientAccountMockMvc;

    private ClientAccount clientAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientAccountResource clientAccountResource = new ClientAccountResource(clientAccountRepository);
        this.restClientAccountMockMvc = MockMvcBuilders.standaloneSetup(clientAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientAccount createEntity(EntityManager em) {
        ClientAccount clientAccount = new ClientAccount()
            .name(DEFAULT_NAME)
            .solde(DEFAULT_SOLDE)
            .lastLocalDateCheck(DEFAULT_LAST_LOCAL_DATE_CHECK)
            .type(DEFAULT_TYPE);
        return clientAccount;
    }

    @Before
    public void initTest() {
        clientAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientAccount() throws Exception {
        int databaseSizeBeforeCreate = clientAccountRepository.findAll().size();

        // Create the ClientAccount
        restClientAccountMockMvc.perform(post("/api/client-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientAccount)))
            .andExpect(status().isCreated());

        // Validate the ClientAccount in the database
        List<ClientAccount> clientAccountList = clientAccountRepository.findAll();
        assertThat(clientAccountList).hasSize(databaseSizeBeforeCreate + 1);
        ClientAccount testClientAccount = clientAccountList.get(clientAccountList.size() - 1);
        assertThat(testClientAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testClientAccount.getSolde()).isEqualTo(DEFAULT_SOLDE);
        assertThat(testClientAccount.getLastLocalDateCheck()).isEqualTo(DEFAULT_LAST_LOCAL_DATE_CHECK);
        assertThat(testClientAccount.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createClientAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientAccountRepository.findAll().size();

        // Create the ClientAccount with an existing ID
        clientAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientAccountMockMvc.perform(post("/api/client-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientAccount)))
            .andExpect(status().isBadRequest());

        // Validate the ClientAccount in the database
        List<ClientAccount> clientAccountList = clientAccountRepository.findAll();
        assertThat(clientAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClientAccounts() throws Exception {
        // Initialize the database
        clientAccountRepository.saveAndFlush(clientAccount);

        // Get all the clientAccountList
        restClientAccountMockMvc.perform(get("/api/client-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].solde").value(hasItem(DEFAULT_SOLDE.doubleValue())))
            .andExpect(jsonPath("$.[*].lastLocalDateCheck").value(hasItem(DEFAULT_LAST_LOCAL_DATE_CHECK.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getClientAccount() throws Exception {
        // Initialize the database
        clientAccountRepository.saveAndFlush(clientAccount);

        // Get the clientAccount
        restClientAccountMockMvc.perform(get("/api/client-accounts/{id}", clientAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clientAccount.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.solde").value(DEFAULT_SOLDE.doubleValue()))
            .andExpect(jsonPath("$.lastLocalDateCheck").value(DEFAULT_LAST_LOCAL_DATE_CHECK.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClientAccount() throws Exception {
        // Get the clientAccount
        restClientAccountMockMvc.perform(get("/api/client-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientAccount() throws Exception {
        // Initialize the database
        clientAccountRepository.saveAndFlush(clientAccount);
        int databaseSizeBeforeUpdate = clientAccountRepository.findAll().size();

        // Update the clientAccount
        ClientAccount updatedClientAccount = clientAccountRepository.findOne(clientAccount.getId());
        // Disconnect from session so that the updates on updatedClientAccount are not directly saved in db
        em.detach(updatedClientAccount);
        updatedClientAccount
            .name(UPDATED_NAME)
            .solde(UPDATED_SOLDE)
            .lastLocalDateCheck(UPDATED_LAST_LOCAL_DATE_CHECK)
            .type(UPDATED_TYPE);

        restClientAccountMockMvc.perform(put("/api/client-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClientAccount)))
            .andExpect(status().isOk());

        // Validate the ClientAccount in the database
        List<ClientAccount> clientAccountList = clientAccountRepository.findAll();
        assertThat(clientAccountList).hasSize(databaseSizeBeforeUpdate);
        ClientAccount testClientAccount = clientAccountList.get(clientAccountList.size() - 1);
        assertThat(testClientAccount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testClientAccount.getSolde()).isEqualTo(UPDATED_SOLDE);
        assertThat(testClientAccount.getLastLocalDateCheck()).isEqualTo(UPDATED_LAST_LOCAL_DATE_CHECK);
        assertThat(testClientAccount.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingClientAccount() throws Exception {
        int databaseSizeBeforeUpdate = clientAccountRepository.findAll().size();

        // Create the ClientAccount

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClientAccountMockMvc.perform(put("/api/client-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientAccount)))
            .andExpect(status().isCreated());

        // Validate the ClientAccount in the database
        List<ClientAccount> clientAccountList = clientAccountRepository.findAll();
        assertThat(clientAccountList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClientAccount() throws Exception {
        // Initialize the database
        clientAccountRepository.saveAndFlush(clientAccount);
        int databaseSizeBeforeDelete = clientAccountRepository.findAll().size();

        // Get the clientAccount
        restClientAccountMockMvc.perform(delete("/api/client-accounts/{id}", clientAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClientAccount> clientAccountList = clientAccountRepository.findAll();
        assertThat(clientAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientAccount.class);
        ClientAccount clientAccount1 = new ClientAccount();
        clientAccount1.setId(1L);
        ClientAccount clientAccount2 = new ClientAccount();
        clientAccount2.setId(clientAccount1.getId());
        assertThat(clientAccount1).isEqualTo(clientAccount2);
        clientAccount2.setId(2L);
        assertThat(clientAccount1).isNotEqualTo(clientAccount2);
        clientAccount1.setId(null);
        assertThat(clientAccount1).isNotEqualTo(clientAccount2);
    }
}

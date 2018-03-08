package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.BeneficiaryAccount;
import ma.oth.repository.BeneficiaryAccountRepository;
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
import java.util.List;

import static ma.oth.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BeneficiaryAccountResource REST controller.
 *
 * @see BeneficiaryAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class BeneficiaryAccountResourceIntTest {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private BeneficiaryAccountRepository beneficiaryAccountRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBeneficiaryAccountMockMvc;

    private BeneficiaryAccount beneficiaryAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BeneficiaryAccountResource beneficiaryAccountResource = new BeneficiaryAccountResource(beneficiaryAccountRepository);
        this.restBeneficiaryAccountMockMvc = MockMvcBuilders.standaloneSetup(beneficiaryAccountResource)
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
    public static BeneficiaryAccount createEntity(EntityManager em) {
        BeneficiaryAccount beneficiaryAccount = new BeneficiaryAccount()
            .label(DEFAULT_LABEL);
        return beneficiaryAccount;
    }

    @Before
    public void initTest() {
        beneficiaryAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createBeneficiaryAccount() throws Exception {
        int databaseSizeBeforeCreate = beneficiaryAccountRepository.findAll().size();

        // Create the BeneficiaryAccount
        restBeneficiaryAccountMockMvc.perform(post("/api/beneficiary-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(beneficiaryAccount)))
            .andExpect(status().isCreated());

        // Validate the BeneficiaryAccount in the database
        List<BeneficiaryAccount> beneficiaryAccountList = beneficiaryAccountRepository.findAll();
        assertThat(beneficiaryAccountList).hasSize(databaseSizeBeforeCreate + 1);
        BeneficiaryAccount testBeneficiaryAccount = beneficiaryAccountList.get(beneficiaryAccountList.size() - 1);
        assertThat(testBeneficiaryAccount.getLabel()).isEqualTo(DEFAULT_LABEL);
    }

    @Test
    @Transactional
    public void createBeneficiaryAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = beneficiaryAccountRepository.findAll().size();

        // Create the BeneficiaryAccount with an existing ID
        beneficiaryAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBeneficiaryAccountMockMvc.perform(post("/api/beneficiary-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(beneficiaryAccount)))
            .andExpect(status().isBadRequest());

        // Validate the BeneficiaryAccount in the database
        List<BeneficiaryAccount> beneficiaryAccountList = beneficiaryAccountRepository.findAll();
        assertThat(beneficiaryAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBeneficiaryAccounts() throws Exception {
        // Initialize the database
        beneficiaryAccountRepository.saveAndFlush(beneficiaryAccount);

        // Get all the beneficiaryAccountList
        restBeneficiaryAccountMockMvc.perform(get("/api/beneficiary-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(beneficiaryAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())));
    }

    @Test
    @Transactional
    public void getBeneficiaryAccount() throws Exception {
        // Initialize the database
        beneficiaryAccountRepository.saveAndFlush(beneficiaryAccount);

        // Get the beneficiaryAccount
        restBeneficiaryAccountMockMvc.perform(get("/api/beneficiary-accounts/{id}", beneficiaryAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(beneficiaryAccount.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBeneficiaryAccount() throws Exception {
        // Get the beneficiaryAccount
        restBeneficiaryAccountMockMvc.perform(get("/api/beneficiary-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBeneficiaryAccount() throws Exception {
        // Initialize the database
        beneficiaryAccountRepository.saveAndFlush(beneficiaryAccount);
        int databaseSizeBeforeUpdate = beneficiaryAccountRepository.findAll().size();

        // Update the beneficiaryAccount
        BeneficiaryAccount updatedBeneficiaryAccount = beneficiaryAccountRepository.findOne(beneficiaryAccount.getId());
        // Disconnect from session so that the updates on updatedBeneficiaryAccount are not directly saved in db
        em.detach(updatedBeneficiaryAccount);
        updatedBeneficiaryAccount
            .label(UPDATED_LABEL);

        restBeneficiaryAccountMockMvc.perform(put("/api/beneficiary-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBeneficiaryAccount)))
            .andExpect(status().isOk());

        // Validate the BeneficiaryAccount in the database
        List<BeneficiaryAccount> beneficiaryAccountList = beneficiaryAccountRepository.findAll();
        assertThat(beneficiaryAccountList).hasSize(databaseSizeBeforeUpdate);
        BeneficiaryAccount testBeneficiaryAccount = beneficiaryAccountList.get(beneficiaryAccountList.size() - 1);
        assertThat(testBeneficiaryAccount.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void updateNonExistingBeneficiaryAccount() throws Exception {
        int databaseSizeBeforeUpdate = beneficiaryAccountRepository.findAll().size();

        // Create the BeneficiaryAccount

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBeneficiaryAccountMockMvc.perform(put("/api/beneficiary-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(beneficiaryAccount)))
            .andExpect(status().isCreated());

        // Validate the BeneficiaryAccount in the database
        List<BeneficiaryAccount> beneficiaryAccountList = beneficiaryAccountRepository.findAll();
        assertThat(beneficiaryAccountList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBeneficiaryAccount() throws Exception {
        // Initialize the database
        beneficiaryAccountRepository.saveAndFlush(beneficiaryAccount);
        int databaseSizeBeforeDelete = beneficiaryAccountRepository.findAll().size();

        // Get the beneficiaryAccount
        restBeneficiaryAccountMockMvc.perform(delete("/api/beneficiary-accounts/{id}", beneficiaryAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BeneficiaryAccount> beneficiaryAccountList = beneficiaryAccountRepository.findAll();
        assertThat(beneficiaryAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BeneficiaryAccount.class);
        BeneficiaryAccount beneficiaryAccount1 = new BeneficiaryAccount();
        beneficiaryAccount1.setId(1L);
        BeneficiaryAccount beneficiaryAccount2 = new BeneficiaryAccount();
        beneficiaryAccount2.setId(beneficiaryAccount1.getId());
        assertThat(beneficiaryAccount1).isEqualTo(beneficiaryAccount2);
        beneficiaryAccount2.setId(2L);
        assertThat(beneficiaryAccount1).isNotEqualTo(beneficiaryAccount2);
        beneficiaryAccount1.setId(null);
        assertThat(beneficiaryAccount1).isNotEqualTo(beneficiaryAccount2);
    }
}

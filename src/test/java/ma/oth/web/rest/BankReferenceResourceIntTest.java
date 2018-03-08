package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.BankReference;
import ma.oth.repository.BankReferenceRepository;
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
 * Test class for the BankReferenceResource REST controller.
 *
 * @see BankReferenceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class BankReferenceResourceIntTest {

    private static final String DEFAULT_BANK_CODE = "AAAAAAAAAA";
    private static final String UPDATED_BANK_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_BOX_CODE = "AAAAAAAAAA";
    private static final String UPDATED_BOX_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_RIB_KEY = "AAAAAAAAAA";
    private static final String UPDATED_RIB_KEY = "BBBBBBBBBB";

    @Autowired
    private BankReferenceRepository bankReferenceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBankReferenceMockMvc;

    private BankReference bankReference;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BankReferenceResource bankReferenceResource = new BankReferenceResource(bankReferenceRepository);
        this.restBankReferenceMockMvc = MockMvcBuilders.standaloneSetup(bankReferenceResource)
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
    public static BankReference createEntity(EntityManager em) {
        BankReference bankReference = new BankReference()
            .bankCode(DEFAULT_BANK_CODE)
            .boxCode(DEFAULT_BOX_CODE)
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .ribKey(DEFAULT_RIB_KEY);
        return bankReference;
    }

    @Before
    public void initTest() {
        bankReference = createEntity(em);
    }

    @Test
    @Transactional
    public void createBankReference() throws Exception {
        int databaseSizeBeforeCreate = bankReferenceRepository.findAll().size();

        // Create the BankReference
        restBankReferenceMockMvc.perform(post("/api/bank-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankReference)))
            .andExpect(status().isCreated());

        // Validate the BankReference in the database
        List<BankReference> bankReferenceList = bankReferenceRepository.findAll();
        assertThat(bankReferenceList).hasSize(databaseSizeBeforeCreate + 1);
        BankReference testBankReference = bankReferenceList.get(bankReferenceList.size() - 1);
        assertThat(testBankReference.getBankCode()).isEqualTo(DEFAULT_BANK_CODE);
        assertThat(testBankReference.getBoxCode()).isEqualTo(DEFAULT_BOX_CODE);
        assertThat(testBankReference.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testBankReference.getRibKey()).isEqualTo(DEFAULT_RIB_KEY);
    }

    @Test
    @Transactional
    public void createBankReferenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankReferenceRepository.findAll().size();

        // Create the BankReference with an existing ID
        bankReference.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankReferenceMockMvc.perform(post("/api/bank-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankReference)))
            .andExpect(status().isBadRequest());

        // Validate the BankReference in the database
        List<BankReference> bankReferenceList = bankReferenceRepository.findAll();
        assertThat(bankReferenceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBankReferences() throws Exception {
        // Initialize the database
        bankReferenceRepository.saveAndFlush(bankReference);

        // Get all the bankReferenceList
        restBankReferenceMockMvc.perform(get("/api/bank-references?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankReference.getId().intValue())))
            .andExpect(jsonPath("$.[*].bankCode").value(hasItem(DEFAULT_BANK_CODE.toString())))
            .andExpect(jsonPath("$.[*].boxCode").value(hasItem(DEFAULT_BOX_CODE.toString())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].ribKey").value(hasItem(DEFAULT_RIB_KEY.toString())));
    }

    @Test
    @Transactional
    public void getBankReference() throws Exception {
        // Initialize the database
        bankReferenceRepository.saveAndFlush(bankReference);

        // Get the bankReference
        restBankReferenceMockMvc.perform(get("/api/bank-references/{id}", bankReference.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bankReference.getId().intValue()))
            .andExpect(jsonPath("$.bankCode").value(DEFAULT_BANK_CODE.toString()))
            .andExpect(jsonPath("$.boxCode").value(DEFAULT_BOX_CODE.toString()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER.toString()))
            .andExpect(jsonPath("$.ribKey").value(DEFAULT_RIB_KEY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBankReference() throws Exception {
        // Get the bankReference
        restBankReferenceMockMvc.perform(get("/api/bank-references/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBankReference() throws Exception {
        // Initialize the database
        bankReferenceRepository.saveAndFlush(bankReference);
        int databaseSizeBeforeUpdate = bankReferenceRepository.findAll().size();

        // Update the bankReference
        BankReference updatedBankReference = bankReferenceRepository.findOne(bankReference.getId());
        // Disconnect from session so that the updates on updatedBankReference are not directly saved in db
        em.detach(updatedBankReference);
        updatedBankReference
            .bankCode(UPDATED_BANK_CODE)
            .boxCode(UPDATED_BOX_CODE)
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .ribKey(UPDATED_RIB_KEY);

        restBankReferenceMockMvc.perform(put("/api/bank-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBankReference)))
            .andExpect(status().isOk());

        // Validate the BankReference in the database
        List<BankReference> bankReferenceList = bankReferenceRepository.findAll();
        assertThat(bankReferenceList).hasSize(databaseSizeBeforeUpdate);
        BankReference testBankReference = bankReferenceList.get(bankReferenceList.size() - 1);
        assertThat(testBankReference.getBankCode()).isEqualTo(UPDATED_BANK_CODE);
        assertThat(testBankReference.getBoxCode()).isEqualTo(UPDATED_BOX_CODE);
        assertThat(testBankReference.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testBankReference.getRibKey()).isEqualTo(UPDATED_RIB_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingBankReference() throws Exception {
        int databaseSizeBeforeUpdate = bankReferenceRepository.findAll().size();

        // Create the BankReference

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBankReferenceMockMvc.perform(put("/api/bank-references")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankReference)))
            .andExpect(status().isCreated());

        // Validate the BankReference in the database
        List<BankReference> bankReferenceList = bankReferenceRepository.findAll();
        assertThat(bankReferenceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBankReference() throws Exception {
        // Initialize the database
        bankReferenceRepository.saveAndFlush(bankReference);
        int databaseSizeBeforeDelete = bankReferenceRepository.findAll().size();

        // Get the bankReference
        restBankReferenceMockMvc.perform(delete("/api/bank-references/{id}", bankReference.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BankReference> bankReferenceList = bankReferenceRepository.findAll();
        assertThat(bankReferenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankReference.class);
        BankReference bankReference1 = new BankReference();
        bankReference1.setId(1L);
        BankReference bankReference2 = new BankReference();
        bankReference2.setId(bankReference1.getId());
        assertThat(bankReference1).isEqualTo(bankReference2);
        bankReference2.setId(2L);
        assertThat(bankReference1).isNotEqualTo(bankReference2);
        bankReference1.setId(null);
        assertThat(bankReference1).isNotEqualTo(bankReference2);
    }
}

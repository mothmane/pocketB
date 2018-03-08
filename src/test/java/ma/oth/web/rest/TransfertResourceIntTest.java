package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.Transfert;
import ma.oth.repository.TransfertRepository;
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

import ma.oth.domain.enumeration.TransfertType;
/**
 * Test class for the TransfertResource REST controller.
 *
 * @see TransfertResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class TransfertResourceIntTest {

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MOTIF = "AAAAAAAAAA";
    private static final String UPDATED_MOTIF = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final TransfertType DEFAULT_TYPE = TransfertType.PUNCTUAL;
    private static final TransfertType UPDATED_TYPE = TransfertType.PERMANENT;

    @Autowired
    private TransfertRepository transfertRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransfertMockMvc;

    private Transfert transfert;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransfertResource transfertResource = new TransfertResource(transfertRepository);
        this.restTransfertMockMvc = MockMvcBuilders.standaloneSetup(transfertResource)
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
    public static Transfert createEntity(EntityManager em) {
        Transfert transfert = new Transfert()
            .amount(DEFAULT_AMOUNT)
            .date(DEFAULT_DATE)
            .motif(DEFAULT_MOTIF)
            .description(DEFAULT_DESCRIPTION)
            .type(DEFAULT_TYPE);
        return transfert;
    }

    @Before
    public void initTest() {
        transfert = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransfert() throws Exception {
        int databaseSizeBeforeCreate = transfertRepository.findAll().size();

        // Create the Transfert
        restTransfertMockMvc.perform(post("/api/transferts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transfert)))
            .andExpect(status().isCreated());

        // Validate the Transfert in the database
        List<Transfert> transfertList = transfertRepository.findAll();
        assertThat(transfertList).hasSize(databaseSizeBeforeCreate + 1);
        Transfert testTransfert = transfertList.get(transfertList.size() - 1);
        assertThat(testTransfert.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testTransfert.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTransfert.getMotif()).isEqualTo(DEFAULT_MOTIF);
        assertThat(testTransfert.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTransfert.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createTransfertWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transfertRepository.findAll().size();

        // Create the Transfert with an existing ID
        transfert.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransfertMockMvc.perform(post("/api/transferts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transfert)))
            .andExpect(status().isBadRequest());

        // Validate the Transfert in the database
        List<Transfert> transfertList = transfertRepository.findAll();
        assertThat(transfertList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransferts() throws Exception {
        // Initialize the database
        transfertRepository.saveAndFlush(transfert);

        // Get all the transfertList
        restTransfertMockMvc.perform(get("/api/transferts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transfert.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].motif").value(hasItem(DEFAULT_MOTIF.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getTransfert() throws Exception {
        // Initialize the database
        transfertRepository.saveAndFlush(transfert);

        // Get the transfert
        restTransfertMockMvc.perform(get("/api/transferts/{id}", transfert.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transfert.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.motif").value(DEFAULT_MOTIF.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransfert() throws Exception {
        // Get the transfert
        restTransfertMockMvc.perform(get("/api/transferts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransfert() throws Exception {
        // Initialize the database
        transfertRepository.saveAndFlush(transfert);
        int databaseSizeBeforeUpdate = transfertRepository.findAll().size();

        // Update the transfert
        Transfert updatedTransfert = transfertRepository.findOne(transfert.getId());
        // Disconnect from session so that the updates on updatedTransfert are not directly saved in db
        em.detach(updatedTransfert);
        updatedTransfert
            .amount(UPDATED_AMOUNT)
            .date(UPDATED_DATE)
            .motif(UPDATED_MOTIF)
            .description(UPDATED_DESCRIPTION)
            .type(UPDATED_TYPE);

        restTransfertMockMvc.perform(put("/api/transferts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransfert)))
            .andExpect(status().isOk());

        // Validate the Transfert in the database
        List<Transfert> transfertList = transfertRepository.findAll();
        assertThat(transfertList).hasSize(databaseSizeBeforeUpdate);
        Transfert testTransfert = transfertList.get(transfertList.size() - 1);
        assertThat(testTransfert.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testTransfert.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTransfert.getMotif()).isEqualTo(UPDATED_MOTIF);
        assertThat(testTransfert.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTransfert.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransfert() throws Exception {
        int databaseSizeBeforeUpdate = transfertRepository.findAll().size();

        // Create the Transfert

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransfertMockMvc.perform(put("/api/transferts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transfert)))
            .andExpect(status().isCreated());

        // Validate the Transfert in the database
        List<Transfert> transfertList = transfertRepository.findAll();
        assertThat(transfertList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTransfert() throws Exception {
        // Initialize the database
        transfertRepository.saveAndFlush(transfert);
        int databaseSizeBeforeDelete = transfertRepository.findAll().size();

        // Get the transfert
        restTransfertMockMvc.perform(delete("/api/transferts/{id}", transfert.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Transfert> transfertList = transfertRepository.findAll();
        assertThat(transfertList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transfert.class);
        Transfert transfert1 = new Transfert();
        transfert1.setId(1L);
        Transfert transfert2 = new Transfert();
        transfert2.setId(transfert1.getId());
        assertThat(transfert1).isEqualTo(transfert2);
        transfert2.setId(2L);
        assertThat(transfert1).isNotEqualTo(transfert2);
        transfert1.setId(null);
        assertThat(transfert1).isNotEqualTo(transfert2);
    }
}

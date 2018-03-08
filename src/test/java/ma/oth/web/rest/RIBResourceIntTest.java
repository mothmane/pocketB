package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.RIB;
import ma.oth.repository.RIBRepository;
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
 * Test class for the RIBResource REST controller.
 *
 * @see RIBResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class RIBResourceIntTest {

    private static final String DEFAULT_IBAN = "AAAAAAAAAA";
    private static final String UPDATED_IBAN = "BBBBBBBBBB";

    private static final String DEFAULT_BIC = "AAAAAAAAAA";
    private static final String UPDATED_BIC = "BBBBBBBBBB";

    @Autowired
    private RIBRepository rIBRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRIBMockMvc;

    private RIB rIB;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RIBResource rIBResource = new RIBResource(rIBRepository);
        this.restRIBMockMvc = MockMvcBuilders.standaloneSetup(rIBResource)
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
    public static RIB createEntity(EntityManager em) {
        RIB rIB = new RIB()
            .iban(DEFAULT_IBAN)
            .bic(DEFAULT_BIC);
        return rIB;
    }

    @Before
    public void initTest() {
        rIB = createEntity(em);
    }

    @Test
    @Transactional
    public void createRIB() throws Exception {
        int databaseSizeBeforeCreate = rIBRepository.findAll().size();

        // Create the RIB
        restRIBMockMvc.perform(post("/api/ribs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rIB)))
            .andExpect(status().isCreated());

        // Validate the RIB in the database
        List<RIB> rIBList = rIBRepository.findAll();
        assertThat(rIBList).hasSize(databaseSizeBeforeCreate + 1);
        RIB testRIB = rIBList.get(rIBList.size() - 1);
        assertThat(testRIB.getIban()).isEqualTo(DEFAULT_IBAN);
        assertThat(testRIB.getBic()).isEqualTo(DEFAULT_BIC);
    }

    @Test
    @Transactional
    public void createRIBWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rIBRepository.findAll().size();

        // Create the RIB with an existing ID
        rIB.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRIBMockMvc.perform(post("/api/ribs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rIB)))
            .andExpect(status().isBadRequest());

        // Validate the RIB in the database
        List<RIB> rIBList = rIBRepository.findAll();
        assertThat(rIBList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRIBS() throws Exception {
        // Initialize the database
        rIBRepository.saveAndFlush(rIB);

        // Get all the rIBList
        restRIBMockMvc.perform(get("/api/ribs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rIB.getId().intValue())))
            .andExpect(jsonPath("$.[*].iban").value(hasItem(DEFAULT_IBAN.toString())))
            .andExpect(jsonPath("$.[*].bic").value(hasItem(DEFAULT_BIC.toString())));
    }

    @Test
    @Transactional
    public void getRIB() throws Exception {
        // Initialize the database
        rIBRepository.saveAndFlush(rIB);

        // Get the rIB
        restRIBMockMvc.perform(get("/api/ribs/{id}", rIB.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rIB.getId().intValue()))
            .andExpect(jsonPath("$.iban").value(DEFAULT_IBAN.toString()))
            .andExpect(jsonPath("$.bic").value(DEFAULT_BIC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRIB() throws Exception {
        // Get the rIB
        restRIBMockMvc.perform(get("/api/ribs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRIB() throws Exception {
        // Initialize the database
        rIBRepository.saveAndFlush(rIB);
        int databaseSizeBeforeUpdate = rIBRepository.findAll().size();

        // Update the rIB
        RIB updatedRIB = rIBRepository.findOne(rIB.getId());
        // Disconnect from session so that the updates on updatedRIB are not directly saved in db
        em.detach(updatedRIB);
        updatedRIB
            .iban(UPDATED_IBAN)
            .bic(UPDATED_BIC);

        restRIBMockMvc.perform(put("/api/ribs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRIB)))
            .andExpect(status().isOk());

        // Validate the RIB in the database
        List<RIB> rIBList = rIBRepository.findAll();
        assertThat(rIBList).hasSize(databaseSizeBeforeUpdate);
        RIB testRIB = rIBList.get(rIBList.size() - 1);
        assertThat(testRIB.getIban()).isEqualTo(UPDATED_IBAN);
        assertThat(testRIB.getBic()).isEqualTo(UPDATED_BIC);
    }

    @Test
    @Transactional
    public void updateNonExistingRIB() throws Exception {
        int databaseSizeBeforeUpdate = rIBRepository.findAll().size();

        // Create the RIB

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRIBMockMvc.perform(put("/api/ribs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rIB)))
            .andExpect(status().isCreated());

        // Validate the RIB in the database
        List<RIB> rIBList = rIBRepository.findAll();
        assertThat(rIBList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRIB() throws Exception {
        // Initialize the database
        rIBRepository.saveAndFlush(rIB);
        int databaseSizeBeforeDelete = rIBRepository.findAll().size();

        // Get the rIB
        restRIBMockMvc.perform(delete("/api/ribs/{id}", rIB.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RIB> rIBList = rIBRepository.findAll();
        assertThat(rIBList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RIB.class);
        RIB rIB1 = new RIB();
        rIB1.setId(1L);
        RIB rIB2 = new RIB();
        rIB2.setId(rIB1.getId());
        assertThat(rIB1).isEqualTo(rIB2);
        rIB2.setId(2L);
        assertThat(rIB1).isNotEqualTo(rIB2);
        rIB1.setId(null);
        assertThat(rIB1).isNotEqualTo(rIB2);
    }
}

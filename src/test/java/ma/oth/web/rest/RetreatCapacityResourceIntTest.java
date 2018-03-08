package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.RetreatCapacity;
import ma.oth.repository.RetreatCapacityRepository;
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
 * Test class for the RetreatCapacityResource REST controller.
 *
 * @see RetreatCapacityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class RetreatCapacityResourceIntTest {

    private static final Double DEFAULT_GLOBAL_CAPACITY = 1D;
    private static final Double UPDATED_GLOBAL_CAPACITY = 2D;

    @Autowired
    private RetreatCapacityRepository retreatCapacityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRetreatCapacityMockMvc;

    private RetreatCapacity retreatCapacity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RetreatCapacityResource retreatCapacityResource = new RetreatCapacityResource(retreatCapacityRepository);
        this.restRetreatCapacityMockMvc = MockMvcBuilders.standaloneSetup(retreatCapacityResource)
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
    public static RetreatCapacity createEntity(EntityManager em) {
        RetreatCapacity retreatCapacity = new RetreatCapacity()
            .globalCapacity(DEFAULT_GLOBAL_CAPACITY);
        return retreatCapacity;
    }

    @Before
    public void initTest() {
        retreatCapacity = createEntity(em);
    }

    @Test
    @Transactional
    public void createRetreatCapacity() throws Exception {
        int databaseSizeBeforeCreate = retreatCapacityRepository.findAll().size();

        // Create the RetreatCapacity
        restRetreatCapacityMockMvc.perform(post("/api/retreat-capacities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retreatCapacity)))
            .andExpect(status().isCreated());

        // Validate the RetreatCapacity in the database
        List<RetreatCapacity> retreatCapacityList = retreatCapacityRepository.findAll();
        assertThat(retreatCapacityList).hasSize(databaseSizeBeforeCreate + 1);
        RetreatCapacity testRetreatCapacity = retreatCapacityList.get(retreatCapacityList.size() - 1);
        assertThat(testRetreatCapacity.getGlobalCapacity()).isEqualTo(DEFAULT_GLOBAL_CAPACITY);
    }

    @Test
    @Transactional
    public void createRetreatCapacityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = retreatCapacityRepository.findAll().size();

        // Create the RetreatCapacity with an existing ID
        retreatCapacity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRetreatCapacityMockMvc.perform(post("/api/retreat-capacities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retreatCapacity)))
            .andExpect(status().isBadRequest());

        // Validate the RetreatCapacity in the database
        List<RetreatCapacity> retreatCapacityList = retreatCapacityRepository.findAll();
        assertThat(retreatCapacityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRetreatCapacities() throws Exception {
        // Initialize the database
        retreatCapacityRepository.saveAndFlush(retreatCapacity);

        // Get all the retreatCapacityList
        restRetreatCapacityMockMvc.perform(get("/api/retreat-capacities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(retreatCapacity.getId().intValue())))
            .andExpect(jsonPath("$.[*].globalCapacity").value(hasItem(DEFAULT_GLOBAL_CAPACITY.doubleValue())));
    }

    @Test
    @Transactional
    public void getRetreatCapacity() throws Exception {
        // Initialize the database
        retreatCapacityRepository.saveAndFlush(retreatCapacity);

        // Get the retreatCapacity
        restRetreatCapacityMockMvc.perform(get("/api/retreat-capacities/{id}", retreatCapacity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(retreatCapacity.getId().intValue()))
            .andExpect(jsonPath("$.globalCapacity").value(DEFAULT_GLOBAL_CAPACITY.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRetreatCapacity() throws Exception {
        // Get the retreatCapacity
        restRetreatCapacityMockMvc.perform(get("/api/retreat-capacities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRetreatCapacity() throws Exception {
        // Initialize the database
        retreatCapacityRepository.saveAndFlush(retreatCapacity);
        int databaseSizeBeforeUpdate = retreatCapacityRepository.findAll().size();

        // Update the retreatCapacity
        RetreatCapacity updatedRetreatCapacity = retreatCapacityRepository.findOne(retreatCapacity.getId());
        // Disconnect from session so that the updates on updatedRetreatCapacity are not directly saved in db
        em.detach(updatedRetreatCapacity);
        updatedRetreatCapacity
            .globalCapacity(UPDATED_GLOBAL_CAPACITY);

        restRetreatCapacityMockMvc.perform(put("/api/retreat-capacities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRetreatCapacity)))
            .andExpect(status().isOk());

        // Validate the RetreatCapacity in the database
        List<RetreatCapacity> retreatCapacityList = retreatCapacityRepository.findAll();
        assertThat(retreatCapacityList).hasSize(databaseSizeBeforeUpdate);
        RetreatCapacity testRetreatCapacity = retreatCapacityList.get(retreatCapacityList.size() - 1);
        assertThat(testRetreatCapacity.getGlobalCapacity()).isEqualTo(UPDATED_GLOBAL_CAPACITY);
    }

    @Test
    @Transactional
    public void updateNonExistingRetreatCapacity() throws Exception {
        int databaseSizeBeforeUpdate = retreatCapacityRepository.findAll().size();

        // Create the RetreatCapacity

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRetreatCapacityMockMvc.perform(put("/api/retreat-capacities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retreatCapacity)))
            .andExpect(status().isCreated());

        // Validate the RetreatCapacity in the database
        List<RetreatCapacity> retreatCapacityList = retreatCapacityRepository.findAll();
        assertThat(retreatCapacityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRetreatCapacity() throws Exception {
        // Initialize the database
        retreatCapacityRepository.saveAndFlush(retreatCapacity);
        int databaseSizeBeforeDelete = retreatCapacityRepository.findAll().size();

        // Get the retreatCapacity
        restRetreatCapacityMockMvc.perform(delete("/api/retreat-capacities/{id}", retreatCapacity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RetreatCapacity> retreatCapacityList = retreatCapacityRepository.findAll();
        assertThat(retreatCapacityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RetreatCapacity.class);
        RetreatCapacity retreatCapacity1 = new RetreatCapacity();
        retreatCapacity1.setId(1L);
        RetreatCapacity retreatCapacity2 = new RetreatCapacity();
        retreatCapacity2.setId(retreatCapacity1.getId());
        assertThat(retreatCapacity1).isEqualTo(retreatCapacity2);
        retreatCapacity2.setId(2L);
        assertThat(retreatCapacity1).isNotEqualTo(retreatCapacity2);
        retreatCapacity1.setId(null);
        assertThat(retreatCapacity1).isNotEqualTo(retreatCapacity2);
    }
}

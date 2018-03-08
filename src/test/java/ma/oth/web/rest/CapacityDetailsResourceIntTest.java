package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.CapacityDetails;
import ma.oth.repository.CapacityDetailsRepository;
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
 * Test class for the CapacityDetailsResource REST controller.
 *
 * @see CapacityDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class CapacityDetailsResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_AMMOUNT = 1D;
    private static final Double UPDATED_AMMOUNT = 2D;

    @Autowired
    private CapacityDetailsRepository capacityDetailsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCapacityDetailsMockMvc;

    private CapacityDetails capacityDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CapacityDetailsResource capacityDetailsResource = new CapacityDetailsResource(capacityDetailsRepository);
        this.restCapacityDetailsMockMvc = MockMvcBuilders.standaloneSetup(capacityDetailsResource)
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
    public static CapacityDetails createEntity(EntityManager em) {
        CapacityDetails capacityDetails = new CapacityDetails()
            .description(DEFAULT_DESCRIPTION)
            .ammount(DEFAULT_AMMOUNT);
        return capacityDetails;
    }

    @Before
    public void initTest() {
        capacityDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createCapacityDetails() throws Exception {
        int databaseSizeBeforeCreate = capacityDetailsRepository.findAll().size();

        // Create the CapacityDetails
        restCapacityDetailsMockMvc.perform(post("/api/capacity-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(capacityDetails)))
            .andExpect(status().isCreated());

        // Validate the CapacityDetails in the database
        List<CapacityDetails> capacityDetailsList = capacityDetailsRepository.findAll();
        assertThat(capacityDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        CapacityDetails testCapacityDetails = capacityDetailsList.get(capacityDetailsList.size() - 1);
        assertThat(testCapacityDetails.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCapacityDetails.getAmmount()).isEqualTo(DEFAULT_AMMOUNT);
    }

    @Test
    @Transactional
    public void createCapacityDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = capacityDetailsRepository.findAll().size();

        // Create the CapacityDetails with an existing ID
        capacityDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCapacityDetailsMockMvc.perform(post("/api/capacity-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(capacityDetails)))
            .andExpect(status().isBadRequest());

        // Validate the CapacityDetails in the database
        List<CapacityDetails> capacityDetailsList = capacityDetailsRepository.findAll();
        assertThat(capacityDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCapacityDetails() throws Exception {
        // Initialize the database
        capacityDetailsRepository.saveAndFlush(capacityDetails);

        // Get all the capacityDetailsList
        restCapacityDetailsMockMvc.perform(get("/api/capacity-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(capacityDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].ammount").value(hasItem(DEFAULT_AMMOUNT.doubleValue())));
    }

    @Test
    @Transactional
    public void getCapacityDetails() throws Exception {
        // Initialize the database
        capacityDetailsRepository.saveAndFlush(capacityDetails);

        // Get the capacityDetails
        restCapacityDetailsMockMvc.perform(get("/api/capacity-details/{id}", capacityDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(capacityDetails.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.ammount").value(DEFAULT_AMMOUNT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCapacityDetails() throws Exception {
        // Get the capacityDetails
        restCapacityDetailsMockMvc.perform(get("/api/capacity-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCapacityDetails() throws Exception {
        // Initialize the database
        capacityDetailsRepository.saveAndFlush(capacityDetails);
        int databaseSizeBeforeUpdate = capacityDetailsRepository.findAll().size();

        // Update the capacityDetails
        CapacityDetails updatedCapacityDetails = capacityDetailsRepository.findOne(capacityDetails.getId());
        // Disconnect from session so that the updates on updatedCapacityDetails are not directly saved in db
        em.detach(updatedCapacityDetails);
        updatedCapacityDetails
            .description(UPDATED_DESCRIPTION)
            .ammount(UPDATED_AMMOUNT);

        restCapacityDetailsMockMvc.perform(put("/api/capacity-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCapacityDetails)))
            .andExpect(status().isOk());

        // Validate the CapacityDetails in the database
        List<CapacityDetails> capacityDetailsList = capacityDetailsRepository.findAll();
        assertThat(capacityDetailsList).hasSize(databaseSizeBeforeUpdate);
        CapacityDetails testCapacityDetails = capacityDetailsList.get(capacityDetailsList.size() - 1);
        assertThat(testCapacityDetails.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCapacityDetails.getAmmount()).isEqualTo(UPDATED_AMMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingCapacityDetails() throws Exception {
        int databaseSizeBeforeUpdate = capacityDetailsRepository.findAll().size();

        // Create the CapacityDetails

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCapacityDetailsMockMvc.perform(put("/api/capacity-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(capacityDetails)))
            .andExpect(status().isCreated());

        // Validate the CapacityDetails in the database
        List<CapacityDetails> capacityDetailsList = capacityDetailsRepository.findAll();
        assertThat(capacityDetailsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCapacityDetails() throws Exception {
        // Initialize the database
        capacityDetailsRepository.saveAndFlush(capacityDetails);
        int databaseSizeBeforeDelete = capacityDetailsRepository.findAll().size();

        // Get the capacityDetails
        restCapacityDetailsMockMvc.perform(delete("/api/capacity-details/{id}", capacityDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CapacityDetails> capacityDetailsList = capacityDetailsRepository.findAll();
        assertThat(capacityDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CapacityDetails.class);
        CapacityDetails capacityDetails1 = new CapacityDetails();
        capacityDetails1.setId(1L);
        CapacityDetails capacityDetails2 = new CapacityDetails();
        capacityDetails2.setId(capacityDetails1.getId());
        assertThat(capacityDetails1).isEqualTo(capacityDetails2);
        capacityDetails2.setId(2L);
        assertThat(capacityDetails1).isNotEqualTo(capacityDetails2);
        capacityDetails1.setId(null);
        assertThat(capacityDetails1).isNotEqualTo(capacityDetails2);
    }
}

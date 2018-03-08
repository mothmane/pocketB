package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.Operation;
import ma.oth.repository.OperationRepository;
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

/**
 * Test class for the OperationResource REST controller.
 *
 * @see OperationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class OperationResourceIntTest {

    private static final Double DEFAULT_AMMOUNT = 1D;
    private static final Double UPDATED_AMMOUNT = 2D;

    private static final String DEFAULT_MOTIF = "AAAAAAAAAA";
    private static final String UPDATED_MOTIF = "BBBBBBBBBB";

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOperationMockMvc;

    private Operation operation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OperationResource operationResource = new OperationResource(operationRepository);
        this.restOperationMockMvc = MockMvcBuilders.standaloneSetup(operationResource)
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
    public static Operation createEntity(EntityManager em) {
        Operation operation = new Operation()
            .ammount(DEFAULT_AMMOUNT)
            .motif(DEFAULT_MOTIF)
            .details(DEFAULT_DETAILS)
            .date(DEFAULT_DATE);
        return operation;
    }

    @Before
    public void initTest() {
        operation = createEntity(em);
    }

    @Test
    @Transactional
    public void createOperation() throws Exception {
        int databaseSizeBeforeCreate = operationRepository.findAll().size();

        // Create the Operation
        restOperationMockMvc.perform(post("/api/operations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operation)))
            .andExpect(status().isCreated());

        // Validate the Operation in the database
        List<Operation> operationList = operationRepository.findAll();
        assertThat(operationList).hasSize(databaseSizeBeforeCreate + 1);
        Operation testOperation = operationList.get(operationList.size() - 1);
        assertThat(testOperation.getAmmount()).isEqualTo(DEFAULT_AMMOUNT);
        assertThat(testOperation.getMotif()).isEqualTo(DEFAULT_MOTIF);
        assertThat(testOperation.getDetails()).isEqualTo(DEFAULT_DETAILS);
        assertThat(testOperation.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createOperationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = operationRepository.findAll().size();

        // Create the Operation with an existing ID
        operation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperationMockMvc.perform(post("/api/operations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operation)))
            .andExpect(status().isBadRequest());

        // Validate the Operation in the database
        List<Operation> operationList = operationRepository.findAll();
        assertThat(operationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOperations() throws Exception {
        // Initialize the database
        operationRepository.saveAndFlush(operation);

        // Get all the operationList
        restOperationMockMvc.perform(get("/api/operations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operation.getId().intValue())))
            .andExpect(jsonPath("$.[*].ammount").value(hasItem(DEFAULT_AMMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].motif").value(hasItem(DEFAULT_MOTIF.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void getOperation() throws Exception {
        // Initialize the database
        operationRepository.saveAndFlush(operation);

        // Get the operation
        restOperationMockMvc.perform(get("/api/operations/{id}", operation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(operation.getId().intValue()))
            .andExpect(jsonPath("$.ammount").value(DEFAULT_AMMOUNT.doubleValue()))
            .andExpect(jsonPath("$.motif").value(DEFAULT_MOTIF.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOperation() throws Exception {
        // Get the operation
        restOperationMockMvc.perform(get("/api/operations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOperation() throws Exception {
        // Initialize the database
        operationRepository.saveAndFlush(operation);
        int databaseSizeBeforeUpdate = operationRepository.findAll().size();

        // Update the operation
        Operation updatedOperation = operationRepository.findOne(operation.getId());
        // Disconnect from session so that the updates on updatedOperation are not directly saved in db
        em.detach(updatedOperation);
        updatedOperation
            .ammount(UPDATED_AMMOUNT)
            .motif(UPDATED_MOTIF)
            .details(UPDATED_DETAILS)
            .date(UPDATED_DATE);

        restOperationMockMvc.perform(put("/api/operations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOperation)))
            .andExpect(status().isOk());

        // Validate the Operation in the database
        List<Operation> operationList = operationRepository.findAll();
        assertThat(operationList).hasSize(databaseSizeBeforeUpdate);
        Operation testOperation = operationList.get(operationList.size() - 1);
        assertThat(testOperation.getAmmount()).isEqualTo(UPDATED_AMMOUNT);
        assertThat(testOperation.getMotif()).isEqualTo(UPDATED_MOTIF);
        assertThat(testOperation.getDetails()).isEqualTo(UPDATED_DETAILS);
        assertThat(testOperation.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingOperation() throws Exception {
        int databaseSizeBeforeUpdate = operationRepository.findAll().size();

        // Create the Operation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOperationMockMvc.perform(put("/api/operations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operation)))
            .andExpect(status().isCreated());

        // Validate the Operation in the database
        List<Operation> operationList = operationRepository.findAll();
        assertThat(operationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOperation() throws Exception {
        // Initialize the database
        operationRepository.saveAndFlush(operation);
        int databaseSizeBeforeDelete = operationRepository.findAll().size();

        // Get the operation
        restOperationMockMvc.perform(delete("/api/operations/{id}", operation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Operation> operationList = operationRepository.findAll();
        assertThat(operationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Operation.class);
        Operation operation1 = new Operation();
        operation1.setId(1L);
        Operation operation2 = new Operation();
        operation2.setId(operation1.getId());
        assertThat(operation1).isEqualTo(operation2);
        operation2.setId(2L);
        assertThat(operation1).isNotEqualTo(operation2);
        operation1.setId(null);
        assertThat(operation1).isNotEqualTo(operation2);
    }
}

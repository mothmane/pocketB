package ma.oth.web.rest;

import ma.oth.PocketBApp;

import ma.oth.domain.Card;
import ma.oth.repository.CardRepository;
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

import ma.oth.domain.enumeration.CardStatus;
import ma.oth.domain.enumeration.CardContactLessStatus;
/**
 * Test class for the CardResource REST controller.
 *
 * @see CardResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PocketBApp.class)
public class CardResourceIntTest {

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final Double DEFAULT_MOUTHLY_PAIEMENT_CAPACITY = 1D;
    private static final Double UPDATED_MOUTHLY_PAIEMENT_CAPACITY = 2D;

    private static final Double DEFAULT_ENGAGED_PAIMENT = 1D;
    private static final Double UPDATED_ENGAGED_PAIMENT = 2D;

    private static final CardStatus DEFAULT_STATUS = CardStatus.ACTIVE;
    private static final CardStatus UPDATED_STATUS = CardStatus.INACTIVE;

    private static final CardContactLessStatus DEFAULT_CONTACT_LESS_STATUS = CardContactLessStatus.ACTIVE;
    private static final CardContactLessStatus UPDATED_CONTACT_LESS_STATUS = CardContactLessStatus.INACTIVE;

    private static final LocalDate DEFAULT_EXPIRY_LOCAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRY_LOCAL_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCardMockMvc;

    private Card card;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardResource cardResource = new CardResource(cardRepository);
        this.restCardMockMvc = MockMvcBuilders.standaloneSetup(cardResource)
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
    public static Card createEntity(EntityManager em) {
        Card card = new Card()
            .number(DEFAULT_NUMBER)
            .mouthlyPaiementCapacity(DEFAULT_MOUTHLY_PAIEMENT_CAPACITY)
            .engagedPaiment(DEFAULT_ENGAGED_PAIMENT)
            .status(DEFAULT_STATUS)
            .contactLessStatus(DEFAULT_CONTACT_LESS_STATUS)
            .expiryLocalDate(DEFAULT_EXPIRY_LOCAL_DATE);
        return card;
    }

    @Before
    public void initTest() {
        card = createEntity(em);
    }

    @Test
    @Transactional
    public void createCard() throws Exception {
        int databaseSizeBeforeCreate = cardRepository.findAll().size();

        // Create the Card
        restCardMockMvc.perform(post("/api/cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(card)))
            .andExpect(status().isCreated());

        // Validate the Card in the database
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeCreate + 1);
        Card testCard = cardList.get(cardList.size() - 1);
        assertThat(testCard.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testCard.getMouthlyPaiementCapacity()).isEqualTo(DEFAULT_MOUTHLY_PAIEMENT_CAPACITY);
        assertThat(testCard.getEngagedPaiment()).isEqualTo(DEFAULT_ENGAGED_PAIMENT);
        assertThat(testCard.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testCard.getContactLessStatus()).isEqualTo(DEFAULT_CONTACT_LESS_STATUS);
        assertThat(testCard.getExpiryLocalDate()).isEqualTo(DEFAULT_EXPIRY_LOCAL_DATE);
    }

    @Test
    @Transactional
    public void createCardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardRepository.findAll().size();

        // Create the Card with an existing ID
        card.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardMockMvc.perform(post("/api/cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(card)))
            .andExpect(status().isBadRequest());

        // Validate the Card in the database
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCards() throws Exception {
        // Initialize the database
        cardRepository.saveAndFlush(card);

        // Get all the cardList
        restCardMockMvc.perform(get("/api/cards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(card.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].mouthlyPaiementCapacity").value(hasItem(DEFAULT_MOUTHLY_PAIEMENT_CAPACITY.doubleValue())))
            .andExpect(jsonPath("$.[*].engagedPaiment").value(hasItem(DEFAULT_ENGAGED_PAIMENT.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].contactLessStatus").value(hasItem(DEFAULT_CONTACT_LESS_STATUS.toString())))
            .andExpect(jsonPath("$.[*].expiryLocalDate").value(hasItem(DEFAULT_EXPIRY_LOCAL_DATE.toString())));
    }

    @Test
    @Transactional
    public void getCard() throws Exception {
        // Initialize the database
        cardRepository.saveAndFlush(card);

        // Get the card
        restCardMockMvc.perform(get("/api/cards/{id}", card.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(card.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.mouthlyPaiementCapacity").value(DEFAULT_MOUTHLY_PAIEMENT_CAPACITY.doubleValue()))
            .andExpect(jsonPath("$.engagedPaiment").value(DEFAULT_ENGAGED_PAIMENT.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.contactLessStatus").value(DEFAULT_CONTACT_LESS_STATUS.toString()))
            .andExpect(jsonPath("$.expiryLocalDate").value(DEFAULT_EXPIRY_LOCAL_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCard() throws Exception {
        // Get the card
        restCardMockMvc.perform(get("/api/cards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCard() throws Exception {
        // Initialize the database
        cardRepository.saveAndFlush(card);
        int databaseSizeBeforeUpdate = cardRepository.findAll().size();

        // Update the card
        Card updatedCard = cardRepository.findOne(card.getId());
        // Disconnect from session so that the updates on updatedCard are not directly saved in db
        em.detach(updatedCard);
        updatedCard
            .number(UPDATED_NUMBER)
            .mouthlyPaiementCapacity(UPDATED_MOUTHLY_PAIEMENT_CAPACITY)
            .engagedPaiment(UPDATED_ENGAGED_PAIMENT)
            .status(UPDATED_STATUS)
            .contactLessStatus(UPDATED_CONTACT_LESS_STATUS)
            .expiryLocalDate(UPDATED_EXPIRY_LOCAL_DATE);

        restCardMockMvc.perform(put("/api/cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCard)))
            .andExpect(status().isOk());

        // Validate the Card in the database
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeUpdate);
        Card testCard = cardList.get(cardList.size() - 1);
        assertThat(testCard.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testCard.getMouthlyPaiementCapacity()).isEqualTo(UPDATED_MOUTHLY_PAIEMENT_CAPACITY);
        assertThat(testCard.getEngagedPaiment()).isEqualTo(UPDATED_ENGAGED_PAIMENT);
        assertThat(testCard.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testCard.getContactLessStatus()).isEqualTo(UPDATED_CONTACT_LESS_STATUS);
        assertThat(testCard.getExpiryLocalDate()).isEqualTo(UPDATED_EXPIRY_LOCAL_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCard() throws Exception {
        int databaseSizeBeforeUpdate = cardRepository.findAll().size();

        // Create the Card

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCardMockMvc.perform(put("/api/cards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(card)))
            .andExpect(status().isCreated());

        // Validate the Card in the database
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCard() throws Exception {
        // Initialize the database
        cardRepository.saveAndFlush(card);
        int databaseSizeBeforeDelete = cardRepository.findAll().size();

        // Get the card
        restCardMockMvc.perform(delete("/api/cards/{id}", card.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Card> cardList = cardRepository.findAll();
        assertThat(cardList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Card.class);
        Card card1 = new Card();
        card1.setId(1L);
        Card card2 = new Card();
        card2.setId(card1.getId());
        assertThat(card1).isEqualTo(card2);
        card2.setId(2L);
        assertThat(card1).isNotEqualTo(card2);
        card1.setId(null);
        assertThat(card1).isNotEqualTo(card2);
    }
}

package ma.oth.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import ma.oth.domain.enumeration.CardStatus;

import ma.oth.domain.enumeration.CardContactLessStatus;

/**
 * Card
 */
@ApiModel(description = "Card")
@Entity
@Table(name = "card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_number")
    private String number;

    @Column(name = "mouthly_paiement_capacity")
    private Double mouthlyPaiementCapacity;

    @Column(name = "engaged_paiment")
    private Double engagedPaiment;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CardStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "contact_less_status")
    private CardContactLessStatus contactLessStatus;

    @Column(name = "expiry_local_date")
    private LocalDate expiryLocalDate;

    @OneToOne
    @JoinColumn(unique = true)
    private ClientAccount accountDebited;

    @OneToOne
    @JoinColumn(unique = true)
    private RetreatCapacity retreatCapacity;

    @OneToMany(mappedBy = "card")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Operation> operations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public Card number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Double getMouthlyPaiementCapacity() {
        return mouthlyPaiementCapacity;
    }

    public Card mouthlyPaiementCapacity(Double mouthlyPaiementCapacity) {
        this.mouthlyPaiementCapacity = mouthlyPaiementCapacity;
        return this;
    }

    public void setMouthlyPaiementCapacity(Double mouthlyPaiementCapacity) {
        this.mouthlyPaiementCapacity = mouthlyPaiementCapacity;
    }

    public Double getEngagedPaiment() {
        return engagedPaiment;
    }

    public Card engagedPaiment(Double engagedPaiment) {
        this.engagedPaiment = engagedPaiment;
        return this;
    }

    public void setEngagedPaiment(Double engagedPaiment) {
        this.engagedPaiment = engagedPaiment;
    }

    public CardStatus getStatus() {
        return status;
    }

    public Card status(CardStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(CardStatus status) {
        this.status = status;
    }

    public CardContactLessStatus getContactLessStatus() {
        return contactLessStatus;
    }

    public Card contactLessStatus(CardContactLessStatus contactLessStatus) {
        this.contactLessStatus = contactLessStatus;
        return this;
    }

    public void setContactLessStatus(CardContactLessStatus contactLessStatus) {
        this.contactLessStatus = contactLessStatus;
    }

    public LocalDate getExpiryLocalDate() {
        return expiryLocalDate;
    }

    public Card expiryLocalDate(LocalDate expiryLocalDate) {
        this.expiryLocalDate = expiryLocalDate;
        return this;
    }

    public void setExpiryLocalDate(LocalDate expiryLocalDate) {
        this.expiryLocalDate = expiryLocalDate;
    }

    public ClientAccount getAccountDebited() {
        return accountDebited;
    }

    public Card accountDebited(ClientAccount clientAccount) {
        this.accountDebited = clientAccount;
        return this;
    }

    public void setAccountDebited(ClientAccount clientAccount) {
        this.accountDebited = clientAccount;
    }

    public RetreatCapacity getRetreatCapacity() {
        return retreatCapacity;
    }

    public Card retreatCapacity(RetreatCapacity retreatCapacity) {
        this.retreatCapacity = retreatCapacity;
        return this;
    }

    public void setRetreatCapacity(RetreatCapacity retreatCapacity) {
        this.retreatCapacity = retreatCapacity;
    }

    public Set<Operation> getOperations() {
        return operations;
    }

    public Card operations(Set<Operation> operations) {
        this.operations = operations;
        return this;
    }

    public Card addOperations(Operation operation) {
        this.operations.add(operation);
        operation.setCard(this);
        return this;
    }

    public Card removeOperations(Operation operation) {
        this.operations.remove(operation);
        operation.setCard(null);
        return this;
    }

    public void setOperations(Set<Operation> operations) {
        this.operations = operations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Card card = (Card) o;
        if (card.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), card.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", mouthlyPaiementCapacity=" + getMouthlyPaiementCapacity() +
            ", engagedPaiment=" + getEngagedPaiment() +
            ", status='" + getStatus() + "'" +
            ", contactLessStatus='" + getContactLessStatus() + "'" +
            ", expiryLocalDate='" + getExpiryLocalDate() + "'" +
            "}";
    }
}

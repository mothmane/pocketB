package ma.oth.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Operation.
 */
@Entity
@Table(name = "operation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Operation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ammount")
    private Double ammount;

    @Column(name = "motif")
    private String motif;

    @Column(name = "details")
    private String details;

    @Column(name = "jhi_date")
    private LocalDate date;

    @ManyToOne
    private Card card;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmmount() {
        return ammount;
    }

    public Operation ammount(Double ammount) {
        this.ammount = ammount;
        return this;
    }

    public void setAmmount(Double ammount) {
        this.ammount = ammount;
    }

    public String getMotif() {
        return motif;
    }

    public Operation motif(String motif) {
        this.motif = motif;
        return this;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public String getDetails() {
        return details;
    }

    public Operation details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDate getDate() {
        return date;
    }

    public Operation date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Card getCard() {
        return card;
    }

    public Operation card(Card card) {
        this.card = card;
        return this;
    }

    public void setCard(Card card) {
        this.card = card;
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
        Operation operation = (Operation) o;
        if (operation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Operation{" +
            "id=" + getId() +
            ", ammount=" + getAmmount() +
            ", motif='" + getMotif() + "'" +
            ", details='" + getDetails() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}

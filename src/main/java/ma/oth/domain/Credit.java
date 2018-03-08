package ma.oth.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import ma.oth.domain.enumeration.CreditType;

/**
 * A Credit.
 */
@Entity
@Table(name = "credit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Credit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "capital_due")
    private Double capitalDue;

    @Column(name = "due_amount")
    private Double dueAmount;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "ending_local_date")
    private LocalDate endingLocalDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private CreditType type;

    @ManyToOne
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getCapitalDue() {
        return capitalDue;
    }

    public Credit capitalDue(Double capitalDue) {
        this.capitalDue = capitalDue;
        return this;
    }

    public void setCapitalDue(Double capitalDue) {
        this.capitalDue = capitalDue;
    }

    public Double getDueAmount() {
        return dueAmount;
    }

    public Credit dueAmount(Double dueAmount) {
        this.dueAmount = dueAmount;
        return this;
    }

    public void setDueAmount(Double dueAmount) {
        this.dueAmount = dueAmount;
    }

    public Integer getDuration() {
        return duration;
    }

    public Credit duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocalDate getEndingLocalDate() {
        return endingLocalDate;
    }

    public Credit endingLocalDate(LocalDate endingLocalDate) {
        this.endingLocalDate = endingLocalDate;
        return this;
    }

    public void setEndingLocalDate(LocalDate endingLocalDate) {
        this.endingLocalDate = endingLocalDate;
    }

    public CreditType getType() {
        return type;
    }

    public Credit type(CreditType type) {
        this.type = type;
        return this;
    }

    public void setType(CreditType type) {
        this.type = type;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Credit customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        Credit credit = (Credit) o;
        if (credit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), credit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Credit{" +
            "id=" + getId() +
            ", capitalDue=" + getCapitalDue() +
            ", dueAmount=" + getDueAmount() +
            ", duration=" + getDuration() +
            ", endingLocalDate='" + getEndingLocalDate() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}

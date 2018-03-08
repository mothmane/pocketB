package ma.oth.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import ma.oth.domain.enumeration.TransfertType;

/**
 * Transfert
 */
@ApiModel(description = "Transfert")
@Entity
@Table(name = "transfert")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Transfert implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "motif")
    private String motif;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TransfertType type;

    @OneToOne
    @JoinColumn(unique = true)
    private ClientAccount transmitter;

    @OneToOne
    @JoinColumn(unique = true)
    private BeneficiaryAccount beneficiary;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public Transfert amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public Transfert date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMotif() {
        return motif;
    }

    public Transfert motif(String motif) {
        this.motif = motif;
        return this;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public String getDescription() {
        return description;
    }

    public Transfert description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TransfertType getType() {
        return type;
    }

    public Transfert type(TransfertType type) {
        this.type = type;
        return this;
    }

    public void setType(TransfertType type) {
        this.type = type;
    }

    public ClientAccount getTransmitter() {
        return transmitter;
    }

    public Transfert transmitter(ClientAccount clientAccount) {
        this.transmitter = clientAccount;
        return this;
    }

    public void setTransmitter(ClientAccount clientAccount) {
        this.transmitter = clientAccount;
    }

    public BeneficiaryAccount getBeneficiary() {
        return beneficiary;
    }

    public Transfert beneficiary(BeneficiaryAccount beneficiaryAccount) {
        this.beneficiary = beneficiaryAccount;
        return this;
    }

    public void setBeneficiary(BeneficiaryAccount beneficiaryAccount) {
        this.beneficiary = beneficiaryAccount;
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
        Transfert transfert = (Transfert) o;
        if (transfert.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transfert.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Transfert{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", date='" + getDate() + "'" +
            ", motif='" + getMotif() + "'" +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}

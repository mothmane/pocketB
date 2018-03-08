package ma.oth.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * RIB
 */
@ApiModel(description = "RIB")
@Entity
@Table(name = "rib")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RIB implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "iban")
    private String iban;

    @Column(name = "bic")
    private String bic;

    @OneToOne
    @JoinColumn(unique = true)
    private BankReference bankReference;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIban() {
        return iban;
    }

    public RIB iban(String iban) {
        this.iban = iban;
        return this;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getBic() {
        return bic;
    }

    public RIB bic(String bic) {
        this.bic = bic;
        return this;
    }

    public void setBic(String bic) {
        this.bic = bic;
    }

    public BankReference getBankReference() {
        return bankReference;
    }

    public RIB bankReference(BankReference bankReference) {
        this.bankReference = bankReference;
        return this;
    }

    public void setBankReference(BankReference bankReference) {
        this.bankReference = bankReference;
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
        RIB rIB = (RIB) o;
        if (rIB.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rIB.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RIB{" +
            "id=" + getId() +
            ", iban='" + getIban() + "'" +
            ", bic='" + getBic() + "'" +
            "}";
    }
}

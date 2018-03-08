package ma.oth.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BeneficiaryAccount.
 */
@Entity
@Table(name = "beneficiary_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BeneficiaryAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_label")
    private String label;

    @ManyToOne
    private ClientAccount account;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public BeneficiaryAccount label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ClientAccount getAccount() {
        return account;
    }

    public BeneficiaryAccount account(ClientAccount clientAccount) {
        this.account = clientAccount;
        return this;
    }

    public void setAccount(ClientAccount clientAccount) {
        this.account = clientAccount;
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
        BeneficiaryAccount beneficiaryAccount = (BeneficiaryAccount) o;
        if (beneficiaryAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), beneficiaryAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BeneficiaryAccount{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            "}";
    }
}

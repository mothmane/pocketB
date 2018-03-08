package ma.oth.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BankReference.
 */
@Entity
@Table(name = "bank_reference")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BankReference implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bank_code")
    private String bankCode;

    @Column(name = "box_code")
    private String boxCode;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "rib_key")
    private String ribKey;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBankCode() {
        return bankCode;
    }

    public BankReference bankCode(String bankCode) {
        this.bankCode = bankCode;
        return this;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBoxCode() {
        return boxCode;
    }

    public BankReference boxCode(String boxCode) {
        this.boxCode = boxCode;
        return this;
    }

    public void setBoxCode(String boxCode) {
        this.boxCode = boxCode;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public BankReference accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getRibKey() {
        return ribKey;
    }

    public BankReference ribKey(String ribKey) {
        this.ribKey = ribKey;
        return this;
    }

    public void setRibKey(String ribKey) {
        this.ribKey = ribKey;
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
        BankReference bankReference = (BankReference) o;
        if (bankReference.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankReference.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankReference{" +
            "id=" + getId() +
            ", bankCode='" + getBankCode() + "'" +
            ", boxCode='" + getBoxCode() + "'" +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", ribKey='" + getRibKey() + "'" +
            "}";
    }
}

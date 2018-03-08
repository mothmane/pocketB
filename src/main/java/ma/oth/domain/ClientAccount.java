package ma.oth.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import ma.oth.domain.enumeration.AccountType;

/**
 * A ClientAccount.
 */
@Entity
@Table(name = "client_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClientAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "solde")
    private Double solde;

    @Column(name = "last_local_date_check")
    private LocalDate lastLocalDateCheck;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private AccountType type;

    @ManyToOne
    private Customer customer;

    @OneToOne
    @JoinColumn(unique = true)
    private RIB rib;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ClientAccount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSolde() {
        return solde;
    }

    public ClientAccount solde(Double solde) {
        this.solde = solde;
        return this;
    }

    public void setSolde(Double solde) {
        this.solde = solde;
    }

    public LocalDate getLastLocalDateCheck() {
        return lastLocalDateCheck;
    }

    public ClientAccount lastLocalDateCheck(LocalDate lastLocalDateCheck) {
        this.lastLocalDateCheck = lastLocalDateCheck;
        return this;
    }

    public void setLastLocalDateCheck(LocalDate lastLocalDateCheck) {
        this.lastLocalDateCheck = lastLocalDateCheck;
    }

    public AccountType getType() {
        return type;
    }

    public ClientAccount type(AccountType type) {
        this.type = type;
        return this;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public Customer getCustomer() {
        return customer;
    }

    public ClientAccount customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public RIB getRib() {
        return rib;
    }

    public ClientAccount rib(RIB rIB) {
        this.rib = rIB;
        return this;
    }

    public void setRib(RIB rIB) {
        this.rib = rIB;
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
        ClientAccount clientAccount = (ClientAccount) o;
        if (clientAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientAccount{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", solde=" + getSolde() +
            ", lastLocalDateCheck='" + getLastLocalDateCheck() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}

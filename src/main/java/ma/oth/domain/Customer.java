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

/**
 * Customer ClientAccount
 */
@ApiModel(description = "Customer ClientAccount")
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birthday")
    private LocalDate birthday;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ClientAccount> accounts = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Credit> credits = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Notification> notifications = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Report> reports = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Customer firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Customer lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public Customer birthday(LocalDate birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public Set<ClientAccount> getAccounts() {
        return accounts;
    }

    public Customer accounts(Set<ClientAccount> clientAccounts) {
        this.accounts = clientAccounts;
        return this;
    }

    public Customer addAccounts(ClientAccount clientAccount) {
        this.accounts.add(clientAccount);
        clientAccount.setCustomer(this);
        return this;
    }

    public Customer removeAccounts(ClientAccount clientAccount) {
        this.accounts.remove(clientAccount);
        clientAccount.setCustomer(null);
        return this;
    }

    public void setAccounts(Set<ClientAccount> clientAccounts) {
        this.accounts = clientAccounts;
    }

    public Set<Credit> getCredits() {
        return credits;
    }

    public Customer credits(Set<Credit> credits) {
        this.credits = credits;
        return this;
    }

    public Customer addCredits(Credit credit) {
        this.credits.add(credit);
        credit.setCustomer(this);
        return this;
    }

    public Customer removeCredits(Credit credit) {
        this.credits.remove(credit);
        credit.setCustomer(null);
        return this;
    }

    public void setCredits(Set<Credit> credits) {
        this.credits = credits;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public Customer notifications(Set<Notification> notifications) {
        this.notifications = notifications;
        return this;
    }

    public Customer addNotifications(Notification notification) {
        this.notifications.add(notification);
        notification.setCustomer(this);
        return this;
    }

    public Customer removeNotifications(Notification notification) {
        this.notifications.remove(notification);
        notification.setCustomer(null);
        return this;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Set<Report> getReports() {
        return reports;
    }

    public Customer reports(Set<Report> reports) {
        this.reports = reports;
        return this;
    }

    public Customer addReports(Report report) {
        this.reports.add(report);
        report.setCustomer(this);
        return this;
    }

    public Customer removeReports(Report report) {
        this.reports.remove(report);
        report.setCustomer(null);
        return this;
    }

    public void setReports(Set<Report> reports) {
        this.reports = reports;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birthday='" + getBirthday() + "'" +
            "}";
    }
}

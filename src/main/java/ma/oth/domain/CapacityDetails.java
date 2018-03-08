package ma.oth.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CapacityDetails.
 */
@Entity
@Table(name = "capacity_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CapacityDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "ammount")
    private Double ammount;

    @ManyToOne
    private RetreatCapacity retreatCapacity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public CapacityDetails description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAmmount() {
        return ammount;
    }

    public CapacityDetails ammount(Double ammount) {
        this.ammount = ammount;
        return this;
    }

    public void setAmmount(Double ammount) {
        this.ammount = ammount;
    }

    public RetreatCapacity getRetreatCapacity() {
        return retreatCapacity;
    }

    public CapacityDetails retreatCapacity(RetreatCapacity retreatCapacity) {
        this.retreatCapacity = retreatCapacity;
        return this;
    }

    public void setRetreatCapacity(RetreatCapacity retreatCapacity) {
        this.retreatCapacity = retreatCapacity;
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
        CapacityDetails capacityDetails = (CapacityDetails) o;
        if (capacityDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), capacityDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CapacityDetails{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", ammount=" + getAmmount() +
            "}";
    }
}

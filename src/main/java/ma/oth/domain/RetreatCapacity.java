package ma.oth.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A RetreatCapacity.
 */
@Entity
@Table(name = "retreat_capacity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RetreatCapacity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "global_capacity")
    private Double globalCapacity;

    @OneToMany(mappedBy = "retreatCapacity")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CapacityDetails> capacityDetails = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getGlobalCapacity() {
        return globalCapacity;
    }

    public RetreatCapacity globalCapacity(Double globalCapacity) {
        this.globalCapacity = globalCapacity;
        return this;
    }

    public void setGlobalCapacity(Double globalCapacity) {
        this.globalCapacity = globalCapacity;
    }

    public Set<CapacityDetails> getCapacityDetails() {
        return capacityDetails;
    }

    public RetreatCapacity capacityDetails(Set<CapacityDetails> capacityDetails) {
        this.capacityDetails = capacityDetails;
        return this;
    }

    public RetreatCapacity addCapacityDetails(CapacityDetails capacityDetails) {
        this.capacityDetails.add(capacityDetails);
        capacityDetails.setRetreatCapacity(this);
        return this;
    }

    public RetreatCapacity removeCapacityDetails(CapacityDetails capacityDetails) {
        this.capacityDetails.remove(capacityDetails);
        capacityDetails.setRetreatCapacity(null);
        return this;
    }

    public void setCapacityDetails(Set<CapacityDetails> capacityDetails) {
        this.capacityDetails = capacityDetails;
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
        RetreatCapacity retreatCapacity = (RetreatCapacity) o;
        if (retreatCapacity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), retreatCapacity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RetreatCapacity{" +
            "id=" + getId() +
            ", globalCapacity=" + getGlobalCapacity() +
            "}";
    }
}

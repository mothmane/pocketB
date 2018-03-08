package ma.oth.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(ma.oth.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(ma.oth.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(ma.oth.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(ma.oth.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.Customer.class.getName() + ".accounts", jcacheConfiguration);
            cm.createCache(ma.oth.domain.Customer.class.getName() + ".credits", jcacheConfiguration);
            cm.createCache(ma.oth.domain.Customer.class.getName() + ".notifications", jcacheConfiguration);
            cm.createCache(ma.oth.domain.Customer.class.getName() + ".reports", jcacheConfiguration);
            cm.createCache(ma.oth.domain.ClientAccount.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.RIB.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.BankReference.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.Card.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.Card.class.getName() + ".operations", jcacheConfiguration);
            cm.createCache(ma.oth.domain.Operation.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.RetreatCapacity.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.RetreatCapacity.class.getName() + ".capacityDetails", jcacheConfiguration);
            cm.createCache(ma.oth.domain.CapacityDetails.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.Transfert.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.BeneficiaryAccount.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.Credit.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.Report.class.getName(), jcacheConfiguration);
            cm.createCache(ma.oth.domain.Notification.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}

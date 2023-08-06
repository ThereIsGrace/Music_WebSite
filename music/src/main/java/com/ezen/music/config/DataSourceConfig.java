package com.ezen.music.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import javax.xml.crypto.Data;

@Configuration
public class DataSourceConfig {
    @Primary    //Bean 우선순위 설정
    @Bean(name="mariaDataSource")
    @ConfigurationProperties(prefix="spring.datasource-mariadb")
    public DataSource mariaDataSource(){
        return DataSourceBuilder.create()
                .type(HikariDataSource.class)
                .build();
    }

    @Bean(name="h2DataSource")
    @ConfigurationProperties(prefix="spring.datasource-h2")
    public DataSource h2DataSource(){
        return DataSourceBuilder.create()
                .type(HikariDataSource.class)
                .build();
    }

}

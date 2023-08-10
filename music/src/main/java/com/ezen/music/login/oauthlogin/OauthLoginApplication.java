package com.ezen.music.login.oauthlogin;

import com.ezen.music.login.oauthlogin.config.properties.AppProperties;
import com.ezen.music.login.oauthlogin.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
public class OauthLoginApplication {

    public static void main(String[] args) {
        SpringApplication.run(OauthLoginApplication.class, args);
    }

}

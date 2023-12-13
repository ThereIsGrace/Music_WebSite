package com.ezen.musictest;


import com.ezen.musictest.domain.Board;
import com.ezen.musictest.domain.Role;
import com.ezen.musictest.domain.User;
import com.ezen.musictest.repository.BoardRepository;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.net.http.HttpClient;
import java.security.Security;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
@EnableJpaAuditing
@SpringBootApplication
public class MusictestApplication implements CommandLineRunner {

	private static final Logger logger =
			LoggerFactory.getLogger(MusictestApplication.class);

	@Override
	public void run(String... args) throws Exception {

	}

	public static void main(String[] args) {
		Security.addProvider(new BouncyCastleProvider());
		SpringApplication.run(MusictestApplication.class, args);
	}
}

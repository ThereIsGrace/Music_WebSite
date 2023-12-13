package com.ezen.musictest.customRestTemplate;

import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.time.Duration;

public class SecureRestTemplate extends RestTemplate{
    public RestTemplate creaateRestTemplate() throws Exception{
        // 신뢰할 수 있는 인증서 관리자를 설정하는 코드
        TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager(){
            @Override
            public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {

            }

            @Override
            public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {

            }

            public X509Certificate[] getAcceptedIssuers(){
                return null;
            }
        }};

        // SSL 컨텍스트를 생성하고 신뢰할 수 있는 인증서 관리자를 설정
        SSLContext sslContext = SSLContext.getInstance("SSL");
        sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

        // 요청 팩토리에 SSL 컨텍스트를 설정
        HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());

        // 호스트 검증을 비활성화하는 코드 (필요에 따라 사용)
        HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);

        // RestTemplate 생성 및 요청 팩토리 설정
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(5);
        requestFactory.setReadTimeout(5);

        return new RestTemplate(requestFactory);
    }
}

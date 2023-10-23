package com.preparedhypeboys.pnj.domain.user.service;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImpl implements
    OAuth2UserService {

    private final String GOOGLE_TOKEN_REQUEST_URL = "https://oauth2.googleapis.com/token";
    private final String GRANT_TYPE = "authorization_code";

    @Value("${google.redirect_uri}")
    private String redirect_uri;

    @Value("${google.client_id}")
    private String googleClientId;

    @Value("${google.client_secret}")
    private String googleClientSecret;

    @Override
    public String loginRedirectProcess(String code) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> params = new HashMap<>();

        params.put("code", code);
        params.put("client_id", googleClientId);
        params.put("client_secret", googleClientSecret);
        params.put("redirect_uri", redirect_uri);
        params.put("grant_type", GRANT_TYPE);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
            GOOGLE_TOKEN_REQUEST_URL, params, String.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.toString();
        }

        return null;
    }
}

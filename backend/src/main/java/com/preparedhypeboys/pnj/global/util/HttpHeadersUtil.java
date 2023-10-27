package com.preparedhypeboys.pnj.global.util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

@Component
public class HttpHeadersUtil {

    public HttpHeaders getOAuthHeader(String token, String contentType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Authorization", "Bearer " + token);
        headers.add("content-Type", contentType);

        return headers;
    }
}

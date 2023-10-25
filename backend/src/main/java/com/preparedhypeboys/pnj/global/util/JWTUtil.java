package com.preparedhypeboys.pnj.global.util;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.springframework.stereotype.Component;

@Component
public class JWTUtil {


    public String decodeGoogleInfo(String jwtToken) {
        byte[] decoded = Base64.getUrlDecoder().decode(jwtToken.split("\\.")[1]);

        return new String(decoded, StandardCharsets.UTF_8);
    }
}

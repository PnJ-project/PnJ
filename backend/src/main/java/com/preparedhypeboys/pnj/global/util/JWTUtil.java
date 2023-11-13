package com.preparedhypeboys.pnj.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JWTUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    private final Long tokenValidTime = 60 * 60 * 1000L;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(Long memberId) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(memberId));

        Date now = new Date();

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + tokenValidTime))
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    public String createRefreshToken(Long memberId) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(memberId));

        Date now = new Date();

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + tokenValidTime * 24 * 7))
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    public Long getMemberIdOfToken(String token) {
        return Long.valueOf(Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject());
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    public boolean validToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build()
                .parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public String decodeGoogleInfo(String jwtToken) {
        byte[] decoded = Base64.getUrlDecoder().decode(jwtToken.split("\\.")[1]);

        return new String(decoded, StandardCharsets.UTF_8);
    }
}

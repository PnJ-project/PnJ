package com.preparedhypeboys.pnj.domain.member.service;

import static com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage.INVALID_TOKEN;
import static com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage.NOT_FOUND_TOKEN;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.LoginResponseDto;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.OAuthMemberInfoDto;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.OAuthTokenResponse;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.TokenRefreshDto;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import com.preparedhypeboys.pnj.global.error.token.TokenInvalidException;
import com.preparedhypeboys.pnj.global.error.token.TokenNotFoundException;
import com.preparedhypeboys.pnj.global.util.JWTUtil;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuth2UserServiceImpl implements
    OAuth2UserService {

    private final MemberRepository memberRepository;
    private final JWTUtil jwtUtil;

    private final Gson gson = buildGson();

    private final String GOOGLE_TOKEN_REQUEST_URL = "https://oauth2.googleapis.com/token";
    private final String GRANT_TYPE = "authorization_code";

    private final String GRANT_TYPE_REFRESH = "refresh_token";

    @Value("${google.redirect_uri}")
    private String redirect_uri;

    @Value("${google.client_id}")
    private String googleClientId;

    @Value("${google.client_secret}")
    private String googleClientSecret;

    @Override
    @Transactional
    public LoginResponseDto loginRedirectProcess(String code) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> params = new HashMap<>();

        params.put("code", code);
        params.put("client_id", googleClientId);
        params.put("client_secret", googleClientSecret);
        params.put("redirect_uri", redirect_uri);
        params.put("grant_type", GRANT_TYPE);

        ResponseEntity<String> response = restTemplate.postForEntity(
            GOOGLE_TOKEN_REQUEST_URL, params, String.class
        );

        OAuthTokenResponse oAuthTokenResponse = gson.fromJson(response.getBody(),
            OAuthTokenResponse.class);

        String decoded = jwtUtil.decodeGoogleInfo(oAuthTokenResponse.getIdToken());

        OAuthMemberInfoDto oAuthMemberInfoDto = gson.fromJson(decoded, OAuthMemberInfoDto.class);

        Optional<Member> member = memberRepository.findByNameAndEmail(oAuthMemberInfoDto.getName(),
            oAuthMemberInfoDto.getEmail());

        if (!member.isPresent()) {
            Member newMember = Member.builder()
                .name(oAuthMemberInfoDto.getName())
                .email(oAuthMemberInfoDto.getEmail())
                .uuid(oAuthMemberInfoDto.getSub())
                .build();

            memberRepository.save(newMember);

            member = Optional.of(newMember);
        }

        member.get().setToken(oAuthTokenResponse.getAccessToken(),
            oAuthTokenResponse.getRefreshToken(), oAuthTokenResponse.getExpiresIn());

        // TODO JWT Refresh Token Redis 적용
        String accessToken = jwtUtil.createToken(member.get().getId());
        String refreshToken = jwtUtil.createRefreshToken(member.get().getId());

        return LoginResponseDto.builder()
            .memberEmail(member.get().getEmail())
            .memberId(member.get().getId())
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    @Override
    @Transactional
    public Member getAccessTokenRefresh(Member member) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> params = new HashMap<>();

        params.put("client_id", googleClientId);
        params.put("client_secret", googleClientSecret);
        params.put("refresh_token", member.getRefreshToken());
        params.put("grant_type", GRANT_TYPE_REFRESH);

        ResponseEntity<String> response = restTemplate.postForEntity(
            GOOGLE_TOKEN_REQUEST_URL, params, String.class
        );

        OAuthTokenResponse oAuthTokenResponse = gson.fromJson(response.getBody(),
            OAuthTokenResponse.class);

        member.refreshExpiredToken(oAuthTokenResponse.getAccessToken(),
            oAuthTokenResponse.getExpiresIn());

        memberRepository.save(member);

        return member;
    }

    @Override
    public TokenRefreshDto reCreateJwtToken(String refreshToken) {

        if (refreshToken == null) {
            throw new TokenNotFoundException(NOT_FOUND_TOKEN.getMessage());
        }

        if (!jwtUtil.validToken(refreshToken)) {
            throw new TokenInvalidException(INVALID_TOKEN.getMessage());
        }

        String accessToken = jwtUtil.createToken(jwtUtil.getMemberIdOfToken(refreshToken));

        return TokenRefreshDto.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    private Gson buildGson() {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();
        builder.setLenient();

        return builder.create();
    }
}

package com.preparedhypeboys.pnj.domain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.LoginResponseDto;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.OAuthMemberInfoDto;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.OAuthTokenResponse;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import com.preparedhypeboys.pnj.global.util.JWTUtil;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional
public class OAuth2UserServiceImpl implements
    OAuth2UserService {

    private final MemberRepository memberRepository;
    private final JWTUtil jwtUtil;

    private final String GOOGLE_TOKEN_REQUEST_URL = "https://oauth2.googleapis.com/token";
    private final String GRANT_TYPE = "authorization_code";

    @Value("${google.redirect_uri}")
    private String redirect_uri;

    @Value("${google.client_id}")
    private String googleClientId;

    @Value("${google.client_secret}")
    private String googleClientSecret;

    @Override
    @Transactional
    public LoginResponseDto loginRedirectProcess(String code) throws JsonProcessingException {
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

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_MISSING_CREATOR_PROPERTIES, false);
        OAuthTokenResponse oAuthTokenResponse = mapper.readValue(response.getBody(),
            OAuthTokenResponse.class);

        String decoded = jwtUtil.decodeGoogleInfo(oAuthTokenResponse.getIdToken());
        mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        OAuthMemberInfoDto oAuthMemberInfoDto = mapper.readValue(decoded, OAuthMemberInfoDto.class);

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
            oAuthTokenResponse.getRefreshToken());

        // TODO JWT TOKEN 암호화 + ResponseDto 변경

        return LoginResponseDto.builder()
            .memberEmail(member.get().getEmail())
            .memberId(member.get().getId())
            .build();
    }
}

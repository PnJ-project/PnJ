package com.preparedhypeboys.pnj.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberResponseDto {

    @Getter
    @NoArgsConstructor
    public static class OAuthTokenResponse {

        @JsonProperty("access_token")
        private String accessToken;

        @JsonProperty("expires_in")
        private Integer expriesIn;

        @JsonProperty("refresh_token")
        private String refreshToken;

        @JsonProperty("scope")
        private String scope;

        @JsonProperty("token_type")
        private String tokenType;

        @JsonProperty("id_token")
        private String idToken;

        @Builder
        public OAuthTokenResponse(String accessToken, Integer expriesIn, String refreshToken,
            String scope,
            String tokenType, String idToken) {
            this.accessToken = accessToken;
            this.expriesIn = expriesIn;
            this.refreshToken = refreshToken;
            this.scope = scope;
            this.tokenType = tokenType;
            this.idToken = idToken;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class OAuthMemberInfoDto {

        private String sub;
        private String name;
        private String email;

        @Builder
        public OAuthMemberInfoDto(String sub, String name, String email) {
            this.sub = sub;
            this.name = name;
            this.email = email;
        }
    }

    @Getter
    public static class LoginReponseDto {

        private Long memeberId;
        private String memberEmail;

        @Builder
        public LoginReponseDto(Long memeberId, String memberEmail) {
            this.memeberId = memeberId;
            this.memberEmail = memberEmail;
        }
    }

}

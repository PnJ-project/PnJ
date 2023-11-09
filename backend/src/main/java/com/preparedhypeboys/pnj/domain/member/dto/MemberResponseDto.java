package com.preparedhypeboys.pnj.domain.member.dto;

import com.google.gson.annotations.SerializedName;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberResponseDto {

    @Getter
    @NoArgsConstructor
    public static class OAuthTokenResponse {

        @SerializedName("access_token")
        private String accessToken;

        @SerializedName("expires_in")
        private Integer expiresIn;

        @SerializedName("refresh_token")
        private String refreshToken;

        @SerializedName("scope")
        private String scope;

        @SerializedName("token_type")
        private String tokenType;

        @SerializedName("id_token")
        private String idToken;

        @Builder
        public OAuthTokenResponse(String accessToken, Integer expiresIn, String refreshToken,
            String scope,
            String tokenType, String idToken) {
            this.accessToken = accessToken;
            this.expiresIn = expiresIn;
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
    public static class LoginResponseDto {

        private Long memberId;
        private String memberEmail;

        @Builder
        public LoginResponseDto(Long memberId, String memberEmail) {
            this.memberId = memberId;
            this.memberEmail = memberEmail;
        }
    }

}

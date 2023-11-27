package com.preparedhypeboys.pnj.domain.member.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberResponseMessage {
    LOGIN_START("로그인 완료"),
    TOKEN_REFRESH_SUCCESS("Access Token Refresh 완료");

    private final String message;
}

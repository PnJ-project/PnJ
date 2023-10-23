package com.preparedhypeboys.pnj.domain.user.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserResponseMessage {
    LOGIN_START("로그인");

    private final String message;
}

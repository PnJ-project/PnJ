package com.preparedhypeboys.pnj.global.error.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {
    NOT_FOUND_USER("유저 조회에 실패했습니다."),
    NOT_FOUND_TODO("Todo 조회에 실패했습니다."),
    NOT_FOUND_TOKEN("토큰이 존재하지 않습니다."),
    INVALID_TOKEN("유효하지 않은 토큰입니다.");

    private final String message;
}

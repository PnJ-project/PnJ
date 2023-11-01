package com.preparedhypeboys.pnj.domain.calendar.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TodoResponseMessage {
    CREATE_TODO_SUCCESS("Todo 생성 완료"),
    READ_TODOS_SUCCESS("Todo 리스트 응답 완료");

    private final String message;
}

package com.preparedhypeboys.pnj.domain.calendar.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TodoResponseMessage {
    CREATE_TODO_SUCCESS("Todo 생성 완료"),
    READ_TODOS_SUCCESS("Todo 리스트 응답 완료"),
    UPDATE_TODO_SUCCESS("Todo 업데이트 완료"),
    DELETE_TODO_SUCCESS("Todo 삭제 완료");

    private final String message;
}

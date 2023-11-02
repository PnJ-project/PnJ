package com.preparedhypeboys.pnj.domain.calendar.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CalendarResponseMessage {
    GET_EVENT_SUCCESS("이벤트 리스트 조회 완료"),
    INSERT_EVENT_SUCCESS("이벤트 직접 생성 완료"),
    DELETE_EVENT_SUCCESS("이벤트 삭제 완료"),
    UPDATE_EVENT_SUCCESS("이벤트 수정 완료"),
    EXCHANGE_TO_TODO_SUCCESS("이벤트 -> TODO 변환 완료");

    private final String message;
}

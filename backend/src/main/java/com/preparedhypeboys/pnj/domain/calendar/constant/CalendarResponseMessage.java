package com.preparedhypeboys.pnj.domain.calendar.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CalendarResponseMessage {
    GET_EVENT_SUCCESS("이벤트 리스트 조회 완료");

    private final String message;
}

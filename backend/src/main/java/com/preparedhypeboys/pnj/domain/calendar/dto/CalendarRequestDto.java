package com.preparedhypeboys.pnj.domain.calendar.dto;

import lombok.Data;

public class CalendarRequestDto {

    @Data
    public static class EventRequestDto {

        private Long memberId;

        private EventDto eventDto;

    }

    @Data
    public static class ExchangeToTodoRequestDto {

        private Long memberId;

        private String eventId;

        private String summary;

    }

    @Data
    public static class ExchangeToEventRequestDto {

        private Long memberId;

        private Long todoId;

        private DateTimeDto start;

        private DateTimeDto end;

    }
}

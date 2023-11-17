package com.preparedhypeboys.pnj.domain.calendar.dto;

import lombok.Data;

public class CalendarRequestDto {

    @Data
    public static class EventRequestDto {

        private EventDto event;

    }

    @Data
    public static class ExchangeToTodoRequestDto {

        private String eventId;

        private String summary;

    }

    @Data
    public static class ExchangeToEventRequestDto {

        private Long todoId;

        private DateTimeDto start;

        private DateTimeDto end;

    }

    @Data
    public static class InputRequestDto {

        private String input;
    }
}

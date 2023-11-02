package com.preparedhypeboys.pnj.domain.calendar.dto;

import lombok.Data;

public class CalendarRequestDto {

    @Data
    public static class EventRequestDto {

        private Long memberId;

        private EventDto eventDto;

    }
}

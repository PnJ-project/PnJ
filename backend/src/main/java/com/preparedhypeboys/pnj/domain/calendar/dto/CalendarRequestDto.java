package com.preparedhypeboys.pnj.domain.calendar.dto;

import lombok.Data;

public class CalendarRequestDto {

    @Data
    public static class InsertEventRequestDto {

        private Long memberId;

        private EventDto eventDto;

    }
}

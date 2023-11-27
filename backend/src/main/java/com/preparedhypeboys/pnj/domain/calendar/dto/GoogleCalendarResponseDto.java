package com.preparedhypeboys.pnj.domain.calendar.dto;

import java.util.List;
import lombok.Data;

public class GoogleCalendarResponseDto {

    @Data
    public static class GoogleEventListResponseDto {

        private List<EventDto> items;

    }

}

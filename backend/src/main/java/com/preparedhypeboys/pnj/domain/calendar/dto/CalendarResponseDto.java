package com.preparedhypeboys.pnj.domain.calendar.dto;

import lombok.Builder;
import lombok.Getter;

public class CalendarResponseDto {

    @Getter
    public static class InputResponseDto {

        private boolean inEvent;

        private boolean inTodo;

        @Builder
        public InputResponseDto(boolean inEvent, boolean inTodo) {
            this.inEvent = inEvent;
            this.inTodo = inTodo;
        }
    }

}

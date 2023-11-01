package com.preparedhypeboys.pnj.domain.calendar.dto;

import com.preparedhypeboys.pnj.domain.calendar.entity.Todo;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TodoResponseDto {

    @Getter
    public static class ReadTodoResponseDto {

        private List<TodoDto> items;

        @Builder
        public ReadTodoResponseDto(List<TodoDto> list) {
            this.items = list;
        }

    }

    @Getter
    public static class CreateTodoResponseDto {

        private TodoDto todoDto;

        @Builder
        public CreateTodoResponseDto(Todo todo) {
            this.todoDto = new TodoDto(todo);
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class TodoDto {

        private Long id;

        private String summary;

        public TodoDto(Todo todo) {
            this.id = todo.getId();
            this.summary = todo.getSummary();
        }

    }
}

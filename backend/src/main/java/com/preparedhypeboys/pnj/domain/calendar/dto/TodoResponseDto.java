package com.preparedhypeboys.pnj.domain.calendar.dto;

import com.preparedhypeboys.pnj.domain.calendar.entity.Todo;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodoResponseDto {

    private Long id;

    private String summary;

    public TodoResponseDto(Todo todo) {
        this.id = todo.getId();
        this.summary = todo.getSummary();
    }

}

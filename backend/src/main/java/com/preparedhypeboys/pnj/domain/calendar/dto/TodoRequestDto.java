package com.preparedhypeboys.pnj.domain.calendar.dto;

import com.preparedhypeboys.pnj.domain.calendar.entity.Todo;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import lombok.Data;

public class TodoRequestDto {

    @Data
    public static class CreateTodoRequestDto {

        private Long memberId;

        private String summary;

        public Todo toTodo(Member member) {
            return Todo.builder()
                .member(member)
                .summary(summary)
                .build();
        }
    }

    @Data
    public static class UpdateTodoRequestDto {

        private Long memberId;

        private Long todoId;

        private String summary;
    }

}

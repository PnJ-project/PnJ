package com.preparedhypeboys.pnj.domain.calendar.service;

import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.CreateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.UpdateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import java.util.List;

public interface TodoService {

    List<TodoResponseDto> readTodo(Long memberId);

    TodoResponseDto createTodo(CreateTodoRequestDto requestDto, Long memberId);

    TodoResponseDto updateTodo(UpdateTodoRequestDto requestDto);

    void deleteTodo(Long memberId);

}

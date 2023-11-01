package com.preparedhypeboys.pnj.domain.calendar.service;

import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.CreateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto.CreateTodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto.ReadTodoResponseDto;

public interface TodoService {

    ReadTodoResponseDto readTodo(Long memberId);

    CreateTodoResponseDto createTodo(CreateTodoRequestDto requestDto);

}

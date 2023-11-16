package com.preparedhypeboys.pnj.domain.calendar.service;

import static com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage.NOT_FOUND_TODO;
import static com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage.NOT_FOUND_USER;

import com.preparedhypeboys.pnj.domain.calendar.dao.TodoRepository;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.CreateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.UpdateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.entity.Todo;
import com.preparedhypeboys.pnj.domain.calendar.exception.TodoNotFoundException;
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import com.preparedhypeboys.pnj.domain.member.exception.MemberNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements
    TodoService {

    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<TodoResponseDto> readTodo(Long memberId) {

        return todoRepository.findTodosByMemberId(memberId);
    }

    @Override
    @Transactional
    public TodoResponseDto createTodo(CreateTodoRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        Todo todo = requestDto.toTodo(member);

        todoRepository.save(todo);

        return new TodoResponseDto(todo);
    }

    @Override
    @Transactional
    public TodoResponseDto updateTodo(UpdateTodoRequestDto requestDto) {
        Todo todo = todoRepository.findById(requestDto.getTodoId()).orElseThrow(
            () -> new TodoNotFoundException(NOT_FOUND_TODO.getMessage()));

        todo.modifySummary(requestDto.getSummary());

        return new TodoResponseDto(todo);

    }

    @Override
    @Transactional
    public void deleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(
            () -> new TodoNotFoundException(NOT_FOUND_TODO.getMessage()));

        todoRepository.delete(todo);

    }
}

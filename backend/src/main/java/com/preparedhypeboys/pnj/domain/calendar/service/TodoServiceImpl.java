package com.preparedhypeboys.pnj.domain.calendar.service;

import com.preparedhypeboys.pnj.domain.calendar.dao.TodoRepository;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.CreateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.UpdateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.entity.Todo;
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;
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
    public TodoResponseDto createTodo(CreateTodoRequestDto requestDto) {
        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

        if (member.isPresent()) {
            Todo todo = requestDto.toTodo(member.get());

            todoRepository.save(todo);

            return new TodoResponseDto(todo);

        }
        return null;
    }

    @Override
    @Transactional
    public TodoResponseDto updateTodo(UpdateTodoRequestDto requestDto) {
        Optional<Todo> todo = todoRepository.findById(requestDto.getTodoId());

        if (todo.isPresent()) {
            todo.get().modifySummary(requestDto.getSummary());

            return new TodoResponseDto(todo.get());
        }
        return null;
    }

    @Override
    public void deleteTodo(Long memberId, Long todoId) {

    }
}

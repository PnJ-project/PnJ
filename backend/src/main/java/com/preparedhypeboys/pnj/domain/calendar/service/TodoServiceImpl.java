package com.preparedhypeboys.pnj.domain.calendar.service;

import com.preparedhypeboys.pnj.domain.calendar.dao.TodoRepository;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.CreateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto.CreateTodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto.ReadTodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.entity.Todo;
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
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
    public ReadTodoResponseDto readTodo(Long memberId) {

        return ReadTodoResponseDto.builder().list(todoRepository.findTodosByMemberId(memberId))
            .build();
    }

    @Override
    @Transactional
    public CreateTodoResponseDto createTodo(CreateTodoRequestDto requestDto) {
        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

        if (member.isPresent()) {
            Todo todo = requestDto.toTodo(member.get());

            todoRepository.save(todo);

            return CreateTodoResponseDto.builder().todo(todo).build();

        }
        return null;
    }
}

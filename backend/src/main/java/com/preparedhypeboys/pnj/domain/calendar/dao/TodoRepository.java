package com.preparedhypeboys.pnj.domain.calendar.dao;

import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.entity.Todo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<TodoResponseDto> findTodosByMemberId(Long memberId);

}

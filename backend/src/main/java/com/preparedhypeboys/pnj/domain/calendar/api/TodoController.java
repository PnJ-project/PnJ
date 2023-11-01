package com.preparedhypeboys.pnj.domain.calendar.api;

import static com.preparedhypeboys.pnj.domain.calendar.constant.TodoResponseMessage.CREATE_TODO_SUCCESS;
import static com.preparedhypeboys.pnj.domain.calendar.constant.TodoResponseMessage.READ_TODOS_SUCCESS;

import com.preparedhypeboys.pnj.domain.calendar.constant.TodoResponseMessage;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoRequestDto.CreateTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto.CreateTodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto.ReadTodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.service.TodoService;
import com.preparedhypeboys.pnj.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    @GetMapping("/{memberId}")
    public ResponseEntity<ResponseDto<ReadTodoResponseDto>> readTodo(@PathVariable(value = "memberId") Long memberId){
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(
                READ_TODOS_SUCCESS.getMessage(),
                todoService.readTodo(memberId)
            )
        );
    }

    @PostMapping("")
    public ResponseEntity<ResponseDto<CreateTodoResponseDto>> createTodo(@RequestBody
        CreateTodoRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(
                CREATE_TODO_SUCCESS.getMessage(),
                todoService.createTodo(requestDto)
            )
        );
    }

}

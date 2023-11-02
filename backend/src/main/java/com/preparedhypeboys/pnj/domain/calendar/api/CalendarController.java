package com.preparedhypeboys.pnj.domain.calendar.api;

import static com.preparedhypeboys.pnj.domain.calendar.constant.CalendarResponseMessage.DELETE_EVENT_SUCCESS;
import static com.preparedhypeboys.pnj.domain.calendar.constant.CalendarResponseMessage.EXCHANGE_TO_EVENT_SUCCESS;
import static com.preparedhypeboys.pnj.domain.calendar.constant.CalendarResponseMessage.EXCHANGE_TO_TODO_SUCCESS;
import static com.preparedhypeboys.pnj.domain.calendar.constant.CalendarResponseMessage.GET_EVENT_SUCCESS;
import static com.preparedhypeboys.pnj.domain.calendar.constant.CalendarResponseMessage.INSERT_EVENT_SUCCESS;
import static com.preparedhypeboys.pnj.domain.calendar.constant.CalendarResponseMessage.UPDATE_EVENT_SUCCESS;

import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.EventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToEventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.service.CalendarService;
import com.preparedhypeboys.pnj.global.dto.ResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/{memberId}/{timeMax}/{timeMin}")
    public ResponseEntity<ResponseDto<List<EventDto>>> getList(
        @PathVariable(value = "memberId") Long memberId,
        @PathVariable(value = "timeMax") String timeMax,
        @PathVariable(value = "timeMin") String timeMin
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(GET_EVENT_SUCCESS.getMessage(),
                calendarService.readEventList(memberId, timeMax, timeMin))
        );
    }

    @PostMapping(value = "")
    public ResponseEntity<ResponseDto<EventDto>> insertEvent(
        @RequestBody EventRequestDto requestDto
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(INSERT_EVENT_SUCCESS.getMessage(),
                calendarService.createEvent(requestDto))
        );
    }

    @DeleteMapping(value = "/{memberId}/{eventId}")
    public ResponseEntity<ResponseDto<?>> deleteEvent(
        @PathVariable(value = "memberId") Long memberId,
        @PathVariable(value = "eventId") String eventId
    ) {
        calendarService.deleteEvent(memberId, eventId);

        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(DELETE_EVENT_SUCCESS.getMessage())
        );
    }

    @PutMapping(value = "")
    public ResponseEntity<ResponseDto<EventDto>> updateEvent(
        @RequestBody EventRequestDto requestDto
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(UPDATE_EVENT_SUCCESS.getMessage(),
                calendarService.updateEvent(requestDto))
        );
    }

    @PostMapping(value = "/to/todo")
    public ResponseEntity<ResponseDto<TodoResponseDto>> exchangeToTodo(
        @RequestBody ExchangeToTodoRequestDto requestDto
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(EXCHANGE_TO_TODO_SUCCESS.getMessage(),
                calendarService.exchangeToTodo(requestDto))
        );
    }

    @PostMapping(value = "/to/event")
    public ResponseEntity<ResponseDto<EventDto>> exchangeToEvent(
        @RequestBody ExchangeToEventRequestDto requestDto
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(EXCHANGE_TO_EVENT_SUCCESS.getMessage(),
                calendarService.exchangeToEvent(requestDto))
        );
    }

}

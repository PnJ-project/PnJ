package com.preparedhypeboys.pnj.domain.calendar.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class CalendarController {

//    private final CalendarService calendarService;
//
//    @GetMapping("/{memberId}/{timeMax}/{timeMin}")
//    public ResponseEntity<ResponseDto<List<EventDto>>> getList(
//        @PathVariable(value = "memberId") Long memberId,
//        @PathVariable(value = "timeMax") String timeMax,
//        @PathVariable(value = "timeMin") String timeMin
//    ) {
//        return ResponseEntity.status(HttpStatus.OK).body(
//            ResponseDto.create(GET_EVENT_SUCCESS.getMessage(),
//                calendarService.readEventList(memberId, timeMax, timeMin))
//        );
//    }
//
//    @PostMapping(value = "")
//    public ResponseEntity<ResponseDto<EventDto>> insertEvent(
//        @RequestBody EventRequestDto requestDto
//    ) {
//        return ResponseEntity.status(HttpStatus.OK).body(
//            ResponseDto.create(INSERT_EVENT_SUCCESS.getMessage(),
//                calendarService.createEvent(requestDto))
//        );
//    }
//
//    @DeleteMapping(value = "/{memberId}/{eventId}")
//    public ResponseEntity<ResponseDto<?>> deleteEvent(
//        @PathVariable(value = "memberId") Long memberId,
//        @PathVariable(value = "eventId") String eventId
//    ) {
//        calendarService.deleteEvent(memberId, eventId);
//
//        return ResponseEntity.status(HttpStatus.OK).body(
//            ResponseDto.create(DELETE_EVENT_SUCCESS.getMessage())
//        );
//    }
//
//    @PutMapping(value = "")
//    public ResponseEntity<ResponseDto<EventDto>> updateEvent(
//        @RequestBody EventRequestDto requestDto
//    ) {
//        return ResponseEntity.status(HttpStatus.OK).body(
//            ResponseDto.create(UPDATE_EVENT_SUCCESS.getMessage(),
//                calendarService.updateEvent(requestDto))
//        );
//    }
//
//    @PostMapping(value = "/to/todo")
//    public ResponseEntity<ResponseDto<TodoResponseDto>> exchangeToTodo(
//        @RequestBody ExchangeToTodoRequestDto requestDto
//    ) {
//        return ResponseEntity.status(HttpStatus.OK).body(
//            ResponseDto.create(EXCHANGE_TO_TODO_SUCCESS.getMessage(),
//                calendarService.exchangeToTodo(requestDto))
//        );
//    }
//
//    @PostMapping(value = "/to/event")
//    public ResponseEntity<ResponseDto<EventDto>> exchangeToEvent(
//        @RequestBody ExchangeToEventRequestDto requestDto
//    ) {
//        return ResponseEntity.status(HttpStatus.OK).body(
//            ResponseDto.create(EXCHANGE_TO_EVENT_SUCCESS.getMessage(),
//                calendarService.exchangeToEvent(requestDto))
//        );
//    }
//
//    @PostMapping(value = "/input")
//    public ResponseEntity<ResponseDto<InputResponseDto>> inputProcess(
//        @RequestBody InputRequestDto requestDto
//    ) {
//        return ResponseEntity.status(HttpStatus.OK).body(
//            ResponseDto.create(INPUT_EASY_SUCCESS.getMessage(),
//            calendarService.inputProcess(requestDto)
//            )
//        );
//    }
}

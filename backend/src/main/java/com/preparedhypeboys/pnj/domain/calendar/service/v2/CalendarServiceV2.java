package com.preparedhypeboys.pnj.domain.calendar.service.v2;

import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.EventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToEventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.InputRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarResponseDto.InputResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import java.util.List;


public interface CalendarServiceV2 {

    List<EventDto> readEventList(Long memberId, String timeMax, String timeMin);

    EventDto createEvent(EventRequestDto event);

    void deleteEvent(Long memberId, String eventId);

    EventDto updateEvent(EventRequestDto requestDto);

    List<EventDto> updateEventList(EventDto event);

    TodoResponseDto exchangeToTodo(ExchangeToTodoRequestDto requestDto);

    EventDto exchangeToEvent(ExchangeToEventRequestDto requestDto);

    InputResponseDto inputProcess(InputRequestDto requestDto);

}

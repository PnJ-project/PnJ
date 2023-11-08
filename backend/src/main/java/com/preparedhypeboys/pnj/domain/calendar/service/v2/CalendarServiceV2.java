package com.preparedhypeboys.pnj.domain.calendar.service.v2;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.EventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToEventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.InputRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarResponseDto.InputResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import java.util.List;


public interface CalendarServiceV2 {

    List<EventDto> readEventList(Long memberId, String tiemMax, String timeMin)
        throws JsonProcessingException;

    EventDto createEvent(EventRequestDto event) throws JsonProcessingException;

    void deleteEvent(Long memberId, String eventId) throws JsonProcessingException;

    EventDto updateEvent(EventRequestDto requestDto) throws JsonProcessingException;

    List<EventDto> updateEventList(EventDto event);

    TodoResponseDto exchangeToTodo(ExchangeToTodoRequestDto requestDto)
        throws JsonProcessingException;

    EventDto exchangeToEvent(ExchangeToEventRequestDto requestDto)
        throws JsonProcessingException;

    InputResponseDto inputProcess(InputRequestDto requestDto) throws JsonProcessingException;

}

package com.preparedhypeboys.pnj.domain.calendar.service;

import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.EventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToEventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import java.util.List;


public interface CalendarService {

    public List<EventDto> readEventList(Long memberId, String tiemMax, String timeMin);

    public EventDto createEvent(EventRequestDto event);

    public void deleteEvent(Long memberId, String eventId);

    public EventDto updateEvent(EventRequestDto requestDto);

    public List<EventDto> updateEventList(EventDto event);

    public TodoResponseDto exchangeToTodo(ExchangeToTodoRequestDto requestDto);

    public EventDto exchangeToEvent(ExchangeToEventRequestDto requestDto);

}

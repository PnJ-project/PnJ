package com.preparedhypeboys.pnj.domain.calendar.service;

import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.InsertEventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import java.util.List;


public interface CalendarService {

    public List<EventDto> readEventList(Long memberId, String tiemMax, String timeMin);

    public EventDto createEvent(InsertEventRequestDto event);

    public void deleteEvent(String eventId);

    public EventDto updateEvent(EventDto event);

    public List<EventDto> updateEventList(EventDto event);

}

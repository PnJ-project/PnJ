package com.preparedhypeboys.pnj.domain.calendar.service;

import com.preparedhypeboys.pnj.domain.calendar.dao.GoogleCalendarDao;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.InsertEventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements
    CalendarService {

    private final MemberRepository memberRepository;

    private final GoogleCalendarDao googleCalendarDao;

    @Override
    public List<EventDto> readEventList(Long memberId, String tiemMax, String timeMin) {
        Optional<Member> member = memberRepository.findById(memberId);

        // TODO 예외처리
        return member.map(
                value -> googleCalendarDao.getEventList(tiemMax, timeMin, value.getAccessToken()))
            .orElse(null);
    }

    @Override
    @Transactional
    public EventDto createEvent(InsertEventRequestDto requestDto) {
        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

        // TODO 예외처리
        return member.map(value -> googleCalendarDao.insertEvent(requestDto.getEventDto(),
            value.getAccessToken())).orElse(null);
    }

    @Override
    @Transactional
    public void deleteEvent(String eventId) {

    }

    @Override
    @Transactional
    public EventDto updateEvent(EventDto event) {
        return null;
    }

    @Override
    public List<EventDto> updateEventList(EventDto event) {
        return null;
    }
}

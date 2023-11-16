package com.preparedhypeboys.pnj.domain.calendar.service.v2;

import static com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage.NOT_FOUND_TODO;
import static com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage.NOT_FOUND_USER;

import com.preparedhypeboys.pnj.domain.calendar.dao.FlaskDao;
import com.preparedhypeboys.pnj.domain.calendar.dao.GoogleCalendarDao;
import com.preparedhypeboys.pnj.domain.calendar.dao.TodoRepository;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.EventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToEventRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.ExchangeToTodoRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarRequestDto.InputRequestDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.CalendarResponseDto.InputResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.TodoResponseDto;
import com.preparedhypeboys.pnj.domain.calendar.entity.Todo;
import com.preparedhypeboys.pnj.domain.calendar.exception.TodoNotFoundException;
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import com.preparedhypeboys.pnj.domain.member.exception.MemberNotFoundException;
import com.preparedhypeboys.pnj.domain.member.service.OAuth2UserService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CalendarServiceV2Impl implements
    CalendarServiceV2 {

    private final MemberRepository memberRepository;

    private final TodoRepository todoRepository;

    private final GoogleCalendarDao googleCalendarDao;

    private final FlaskDao flaskDao;

    private final OAuth2UserService memberService;

    @Override
    public List<EventDto> readEventList(Long memberId, String timeMax, String timeMin) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        if (member.isTokenInvalid()) {
            member = memberService.getAccessTokenRefresh(member);
        }

        return googleCalendarDao.getEventList(timeMax, timeMin, member.getAccessToken());
    }

    @Override
    @Transactional
    public EventDto createEvent(EventRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        if (member.isTokenInvalid()) {
            member = memberService.getAccessTokenRefresh(member);
        }

        log.info(requestDto.getEvent().getStart().toString());
        log.info(requestDto.getEvent().getSummary());

        return googleCalendarDao.insertEvent(requestDto.getEvent(),
            member.getAccessToken());
    }

    @Override
    @Transactional
    public void deleteEvent(Long memberId, String eventId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        if (member.isTokenInvalid()) {
            member = memberService.getAccessTokenRefresh(member);
        }

        googleCalendarDao.deleteEvent(eventId, member.getAccessToken());
    }

    @Override
    @Transactional
    public EventDto updateEvent(EventRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        if (member.isTokenInvalid()) {
            member = memberService.getAccessTokenRefresh(member);
        }

        return googleCalendarDao.updateEvent(requestDto.getEvent(),
            member.getAccessToken());
    }

    @Override
    public List<EventDto> updateEventList(EventDto event) {
        return null;
    }

    @Override
    @Transactional
    public TodoResponseDto exchangeToTodo(ExchangeToTodoRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        if (member.isTokenInvalid()) {
            member = memberService.getAccessTokenRefresh(member);
        }

        googleCalendarDao.deleteEvent(requestDto.getEventId(), member.getAccessToken());

        Todo todo = Todo.builder()
            .member(member)
            .summary(requestDto.getSummary())
            .build();

        todoRepository.save(todo);

        return new TodoResponseDto(todo);

    }

    @Override
    @Transactional
    public EventDto exchangeToEvent(ExchangeToEventRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        if (member.isTokenInvalid()) {
            member = memberService.getAccessTokenRefresh(member);
        }

        Todo todo = todoRepository.findById(requestDto.getTodoId()).orElseThrow(
            () -> new TodoNotFoundException(NOT_FOUND_TODO.getMessage())
        );

        EventDto eventDto = EventDto.builder()
            .summary(todo.getSummary())
            .start(requestDto.getStart())
            .end(requestDto.getEnd())
            .build();

        EventDto response = googleCalendarDao.insertEvent(eventDto,
            member.getAccessToken());

        todoRepository.delete(todo);

        return response;
    }

    @Override
    @Transactional
    public InputResponseDto inputProcess(InputRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        if (member.isTokenInvalid()) {
            member = memberService.getAccessTokenRefresh(member);
        }

        List<EventDto> eventDtos = flaskDao.getInputTransport(requestDto.getInput());

        boolean inEvent = false;
        boolean inTodo = false;

        List<Todo> todoList = new ArrayList<>();

        for (EventDto e : eventDtos) {

            if (e.getStart().getDateTime() == null) {
                inTodo = true;

                Todo todo = Todo.builder()
                    .summary(e.getSummary())
                    .member(member)
                    .build();

                todoList.add(todo);
            }

            if (e.getStart().getDateTime() != null) {
                inEvent = true;

                googleCalendarDao.insertEvent(e, member.getAccessToken());
            }
        }

        if (!todoList.isEmpty()) {
            todoRepository.saveAll(todoList);
        }

        return InputResponseDto.builder().inTodo(inTodo).inEvent(inEvent).build();
    }
}

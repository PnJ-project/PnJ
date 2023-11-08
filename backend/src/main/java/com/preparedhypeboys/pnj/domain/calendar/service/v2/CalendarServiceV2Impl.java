package com.preparedhypeboys.pnj.domain.calendar.service.v2;

import com.fasterxml.jackson.core.JsonProcessingException;
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
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import com.preparedhypeboys.pnj.domain.member.service.OAuth2UserService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

@Service
@RequiredArgsConstructor
public class CalendarServiceV2Impl implements
    CalendarServiceV2 {

    private final MemberRepository memberRepository;

    private final TodoRepository todoRepository;

    private final GoogleCalendarDao googleCalendarDao;

    private final FlaskDao flaskDao;

    private final OAuth2UserService memberService;

    @Override
    public List<EventDto> readEventList(Long memberId, String timeMax, String timeMin)
        throws JsonProcessingException {
        Optional<Member> member = memberRepository.findById(memberId);

        List<EventDto> dtoList = new ArrayList<>();

        try {
            if (member.isPresent()) {
                dtoList = googleCalendarDao.getEventList(timeMax, timeMin,
                    member.get().getAccessToken());
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().equals(HttpStatus.UNAUTHORIZED)) {
                String accessToken = expiredTokenExceptionHandle(member.get().getRefreshToken());

                member.ifPresent(m -> {
                    m.refreshExpiredToken(accessToken);
                    memberRepository.save(m);
                });

                dtoList = googleCalendarDao.getEventList(timeMax, timeMin, accessToken);
            }
            // TODO 추가 예외처리
        }

        return dtoList;

    }

    @Override
    @Transactional
    public EventDto createEvent(EventRequestDto requestDto) throws JsonProcessingException {
        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

        try {
            return member.map(value -> googleCalendarDao.insertEvent(requestDto.getEvent(),
                value.getAccessToken())).orElse(null);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().equals(HttpStatus.UNAUTHORIZED)) {
                String accessToken = expiredTokenExceptionHandle(member.get().getRefreshToken());

                member.ifPresent(m -> {
                    m.refreshExpiredToken(accessToken);
                    memberRepository.save(m);
                });

                return googleCalendarDao.insertEvent(requestDto.getEvent(), accessToken);
            }
            // Todo 추가예외처리
            return null;
        }

    }

    @Override
    @Transactional
    public void deleteEvent(Long memberId, String eventId) throws JsonProcessingException {
        Optional<Member> member = memberRepository.findById(memberId);

        try {
            member.ifPresent(
                value -> googleCalendarDao.deleteEvent(eventId, value.getAccessToken()));
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().equals(HttpStatus.UNAUTHORIZED)) {
                String accessToken = expiredTokenExceptionHandle(member.get().getRefreshToken());

                member.ifPresent(m -> {
                    m.refreshExpiredToken(accessToken);
                    memberRepository.save(m);
                });
                googleCalendarDao.deleteEvent(eventId, accessToken);
            }
            // Todo 추가예외처리
        }

    }

    @Override
    @Transactional
    public EventDto updateEvent(EventRequestDto requestDto) throws JsonProcessingException {
        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

        try {
            return member.map(value -> googleCalendarDao.updateEvent(requestDto.getEvent(),
                    value.getAccessToken()))
                .orElse(null);
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().equals(HttpStatus.UNAUTHORIZED)) {
                String accessToken = expiredTokenExceptionHandle(member.get().getRefreshToken());

                member.ifPresent(m -> {
                    m.refreshExpiredToken(accessToken);
                    memberRepository.save(m);
                });
                return googleCalendarDao.updateEvent(requestDto.getEvent(), accessToken);
            }
            // Todo 추가예외처리
        }

        return null;
    }

    @Override
    public List<EventDto> updateEventList(EventDto event) {
        return null;
    }

    @Override
    @Transactional
    public TodoResponseDto exchangeToTodo(ExchangeToTodoRequestDto requestDto)
        throws JsonProcessingException {
        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

        if (member.isPresent()) {

            try {
                googleCalendarDao.deleteEvent(requestDto.getEventId(),
                    member.get().getAccessToken());
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode().equals(HttpStatus.UNAUTHORIZED)) {
                    String accessToken = expiredTokenExceptionHandle(
                        member.get().getRefreshToken());

                    member.ifPresent(m -> {
                        m.refreshExpiredToken(accessToken);
                        memberRepository.save(m);
                    });

                    googleCalendarDao.deleteEvent(requestDto.getEventId(),
                        member.get().getAccessToken());
                }
            }

            Todo todo = Todo.builder()
                .member(member.get())
                .summary(requestDto.getSummary())
                .build();

            todoRepository.save(todo);

            return new TodoResponseDto(todo);
        }
        return null;
    }

    @Override
    @Transactional
    public EventDto exchangeToEvent(ExchangeToEventRequestDto requestDto)
        throws JsonProcessingException {
        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

        Optional<Todo> todo = todoRepository.findById(requestDto.getTodoId());

        if (member.isPresent() && todo.isPresent()) {
            EventDto eventDto = EventDto.builder()
                .summary(todo.get().getSummary())
                .start(requestDto.getStart())
                .end(requestDto.getEnd())
                .build();

            todoRepository.delete(todo.get());

            try {
                return googleCalendarDao.insertEvent(eventDto,
                    member.get().getAccessToken());
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode().equals(HttpStatus.UNAUTHORIZED)) {
                    String accessToken = expiredTokenExceptionHandle(
                        member.get().getRefreshToken());

                    member.ifPresent(m -> {
                        m.refreshExpiredToken(accessToken);
                        memberRepository.save(m);
                    });

                    return googleCalendarDao.insertEvent(eventDto,
                        accessToken);
                }
                // TODO 트랜지션 롤백 처리
            }
        }
        // Todo 예외처리
        return null;
    }

    @Override
    @Transactional
    public InputResponseDto inputProcess(InputRequestDto requestDto)
        throws JsonProcessingException {
        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

        if (member.isEmpty()) {
            // TODO 예외처리
            return null;
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
                    .member(member.get())
                    .build();

                todoList.add(todo);
            }

            if (e.getStart().getDateTime() != null) {
                inEvent = true;
                try {
                    googleCalendarDao.insertEvent(e, member.get().getAccessToken());
                } catch (HttpClientErrorException exception) {
                    if (exception.getStatusCode().equals(HttpStatus.UNAUTHORIZED)) {
                        String accessToken = expiredTokenExceptionHandle(
                            member.get().getRefreshToken());

                        member.ifPresent(m -> {
                            m.refreshExpiredToken(accessToken);
                            memberRepository.save(m);
                        });

                        googleCalendarDao.insertEvent(e, accessToken);
                    }
                }

            }
        }

        if (!todoList.isEmpty()) {
            todoRepository.saveAll(todoList);
        }

        return InputResponseDto.builder().inTodo(inTodo).inEvent(inEvent).build();
    }

    private String expiredTokenExceptionHandle(String accessToken) throws JsonProcessingException {
        return memberService.getAccessTokenRefresh(accessToken);
    }

}

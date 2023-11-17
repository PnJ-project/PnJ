package com.preparedhypeboys.pnj.domain.calendar.service;

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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements
    CalendarService {

//    private final MemberRepository memberRepository;
//
//    private final TodoRepository todoRepository;
//
//    private final GoogleCalendarDao googleCalendarDao;
//
//    private final FlaskDao flaskDao;
//
//    @Override
//    public List<EventDto> readEventList(Long memberId, String tiemMax, String timeMin) {
//        Optional<Member> member = memberRepository.findById(memberId);
//
//        // TODO 예외처리
//        return member.map(
//                value -> googleCalendarDao.getEventList(tiemMax, timeMin, value.getAccessToken()))
//            .orElse(new ArrayList<>());
//    }
//
//    @Override
//    @Transactional
//    public EventDto createEvent(EventRequestDto requestDto) {
//        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());
//
//        // TODO 예외처리
//        return member.map(value -> googleCalendarDao.insertEvent(requestDto.getEvent(),
//            value.getAccessToken())).orElse(null);
//    }
//
//    @Override
//    @Transactional
//    public void deleteEvent(Long memberId, String eventId) {
//        Optional<Member> member = memberRepository.findById(memberId);
//
//        member.ifPresent(value -> googleCalendarDao.deleteEvent(eventId, value.getAccessToken()));
//    }
//
//    @Override
//    @Transactional
//    public EventDto updateEvent(EventRequestDto requestDto) {
//        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());
//
//        // TODO 예외처리
//        return member.map(value -> googleCalendarDao.updateEvent(requestDto.getEvent(),
//                value.getAccessToken()))
//            .orElse(null);
//    }
//
//    @Override
//    public List<EventDto> updateEventList(EventDto event) {
//        return null;
//    }
//
//    @Override
//    @Transactional
//    public TodoResponseDto exchangeToTodo(ExchangeToTodoRequestDto requestDto) {
//        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());
//
//        if (member.isPresent()) {
//            googleCalendarDao.deleteEvent(requestDto.getEventId(), member.get().getAccessToken());
//
//            Todo todo = Todo.builder()
//                .member(member.get())
//                .summary(requestDto.getSummary())
//                .build();
//
//            todoRepository.save(todo);
//
//            return new TodoResponseDto(todo);
//        }
//        // Todo 예외처리
//        return null;
//    }
//
//    @Override
//    @Transactional
//    public EventDto exchangeToEvent(ExchangeToEventRequestDto requestDto) {
//        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());
//
//        Optional<Todo> todo = todoRepository.findById(requestDto.getTodoId());
//
//        if (member.isPresent() && todo.isPresent()) {
//            EventDto eventDto = EventDto.builder()
//                .summary(todo.get().getSummary())
//                .start(requestDto.getStart())
//                .end(requestDto.getEnd())
//                .build();
//
//            EventDto response = googleCalendarDao.insertEvent(eventDto,
//                member.get().getAccessToken());
//
//            todoRepository.delete(todo.get());
//
//            return response;
//        }
//        // Todo 예외처리
//        return null;
//    }
//
//    @Override
//    @Transactional
//    public InputResponseDto inputProcess(InputRequestDto requestDto) {
//        Optional<Member> member = memberRepository.findById(requestDto.getMemberId());
//
//        if (member.isEmpty()) {
//            // TODO 예외처리
//            return null;
//        }
//
//        List<EventDto> eventDtos = flaskDao.getInputTransport(requestDto.getInput());
//
//        boolean inEvent = false;
//        boolean inTodo = false;
//
//        List<Todo> todoList = new ArrayList<>();
//
//        for (EventDto e : eventDtos) {
//            if (e.getStart().getDateTime() == null) {
//                inTodo = true;
//
//                Todo todo = Todo.builder()
//                    .summary(e.getSummary())
//                    .member(member.get())
//                    .build();
//
//                todoList.add(todo);
//            }
//
//            if (e.getStart().getDateTime() != null) {
//                inEvent = true;
//
//                googleCalendarDao.insertEvent(e, member.get().getAccessToken());
//            }
//        }
//
//        if (!todoList.isEmpty()) {
//            todoRepository.saveAll(todoList);
//        }
//
//        return InputResponseDto.builder().inTodo(inTodo).inEvent(inEvent).build();
//    }
}

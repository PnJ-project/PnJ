package com.preparedhypeboys.pnj.domain.suggestion.service;

import static com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage.NOT_FOUND_USER;

import com.google.gson.JsonObject;
import com.preparedhypeboys.pnj.domain.calendar.dao.FlaskDao;
import com.preparedhypeboys.pnj.domain.calendar.dao.GoogleCalendarDao;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.member.dao.MemberRepository;
import com.preparedhypeboys.pnj.domain.member.entity.Member;
import com.preparedhypeboys.pnj.domain.member.exception.MemberNotFoundException;
import com.preparedhypeboys.pnj.domain.member.service.OAuth2UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SuggestionServiceImpl implements
    SuggestionService {

    private final MemberRepository memberRepository;

    private final OAuth2UserService memberService;

    private final GoogleCalendarDao googleCalendarDao;

    private final FlaskDao flaskDao;

    @Override
    public JsonObject getSuggestionInfo(Long memberId, String timeMax, String timeMin) {
        Member member = memberRepository.findById(memberId).orElseThrow(
            () -> new MemberNotFoundException(NOT_FOUND_USER.getMessage()));

        if (member.isTokenInvalid()) {
            member = memberService.getAccessTokenRefresh(member);
        }

        List<EventDto> events = googleCalendarDao.getEventList(timeMax, timeMin,
            member.getAccessToken());

        return flaskDao.getSuggestionResponse(serializationEventSummary(events));
    }

    private String serializationEventSummary(List<EventDto> events) {
        StringBuilder stringBuilder = new StringBuilder();

        for (EventDto e : events) {
            stringBuilder.append(e.getSummary());
        }

        return stringBuilder.toString();
    }
}

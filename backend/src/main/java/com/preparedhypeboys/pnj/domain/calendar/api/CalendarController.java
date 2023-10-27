package com.preparedhypeboys.pnj.domain.calendar.api;

import com.preparedhypeboys.pnj.domain.calendar.constant.CalendarResponseMessage;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.calendar.service.CalendarService;
import com.preparedhypeboys.pnj.global.dto.ResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/{memberId}/{timeMax}/{timeMin}")
    public ResponseEntity<ResponseDto<List<EventDto>>> getList(
        @PathVariable(value = "memberId") Long memberId,
        @PathVariable(value = "timeMax") String timeMax,
        @PathVariable(value = "timeMin") String timeMin
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(CalendarResponseMessage.GET_EVENT_SUCCESS.getMessage(),
                calendarService.readEventList(memberId, timeMax, timeMin))
        );
    }

}

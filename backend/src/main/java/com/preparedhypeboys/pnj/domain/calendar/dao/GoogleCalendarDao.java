package com.preparedhypeboys.pnj.domain.calendar.dao;

import com.google.gson.Gson;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.GoogleCalendarResponseDto.GoogleEventListResponseDto;
import com.preparedhypeboys.pnj.global.util.HttpHeadersUtil;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class GoogleCalendarDao {

    private final HttpHeadersUtil httpHeadersUtil;

    private final Gson gson = new Gson();

    private final String host = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    private final String contentType = "application/json";

    public List<EventDto> getEventList(String timeMax, String timeMin, String accessToken) {

        HttpHeaders headers = httpHeadersUtil.getOAuthHeader(accessToken, contentType);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(headers);

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(host)
            .queryParam("timeMax", timeMax)
            .queryParam("timeMin", timeMin);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(uriBuilder.toUriString(),
            HttpMethod.GET, requestEntity, String.class);

        GoogleEventListResponseDto dto = gson.fromJson(response.getBody(),
            GoogleEventListResponseDto.class);

        return dto.getItems();

    }

}

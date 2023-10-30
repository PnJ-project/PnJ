package com.preparedhypeboys.pnj.domain.calendar.dao;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import com.preparedhypeboys.pnj.domain.calendar.dto.GoogleCalendarResponseDto.GoogleEventListResponseDto;
import com.preparedhypeboys.pnj.global.util.HttpHeadersUtil;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
@Slf4j
public class GoogleCalendarDao {

    private final HttpHeadersUtil httpHeadersUtil;

    private final RestTemplate restTemplate = new RestTemplate();
    private final Gson gson = buildGson();
    private final ObjectMapper objectMapper = new ObjectMapper().setSerializationInclusion(
        Include.NON_NULL).setSerializationInclusion(Include.NON_EMPTY);

    private final String host = "https://www.googleapis.com/calendar/v3/calendars/primary/events";

    public List<EventDto> getEventList(String timeMax, String timeMin, String accessToken) {

        HttpHeaders headers = httpHeadersUtil.getOAuthHeader(accessToken);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(headers);

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(host)
            .queryParam("timeMax", timeMax)
            .queryParam("timeMin", timeMin);

        ResponseEntity<String> response = restTemplate.exchange(uriBuilder.toUriString(),
            HttpMethod.GET, requestEntity, String.class);

        return gson.fromJson(response.getBody(),
            GoogleEventListResponseDto.class).getItems();

    }

    public EventDto insertEvent(EventDto eventDto, String accessToken) {

        HttpHeaders headers = httpHeadersUtil.getOAuthHeader(accessToken);

        HttpEntity<String> requestEntity = new HttpEntity<>(gson.toJson(eventDto), headers);

        ResponseEntity<String> response = restTemplate.exchange(host, HttpMethod.POST,
            requestEntity, String.class);

        return gson.fromJson(response.getBody(), EventDto.class);
    }

    public void deleteEvent(String eventId, String accessToken) {

        HttpHeaders headers = httpHeadersUtil.getOAuthHeader(accessToken);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(headers);

        restTemplate.exchange(host + "/" + eventId, HttpMethod.DELETE,
            requestEntity, String.class);
    }

    public EventDto updateEvent(EventDto eventDto, String accessToken) {

        HttpHeaders headers = httpHeadersUtil.getOAuthHeader(accessToken);

        HttpEntity<String> requestEntity = new HttpEntity<>(gson.toJson(eventDto), headers);

        ResponseEntity<String> response = restTemplate.exchange(host + "/" + eventDto.getId(),
            HttpMethod.PUT,
            requestEntity, String.class);

        return gson.fromJson(response.getBody(), EventDto.class);
    }

    private Gson buildGson() {
        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        return builder.create();
    }
}

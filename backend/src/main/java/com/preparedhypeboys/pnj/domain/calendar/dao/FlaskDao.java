package com.preparedhypeboys.pnj.domain.calendar.dao;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class FlaskDao {

    @Value("${flask.host}")
    private String FLASK_HOST;

    private final Gson gson = new Gson();

    public List<EventDto> getInputTransport(String input) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        params.put("input", Collections.singletonList(input));

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
            FLASK_HOST + "/trans/date", requestEntity, String.class
        );

        Type type = new TypeToken<List<EventDto>>() {
        }.getType();
        List<EventDto> list = gson.fromJson(response.getBody(), type);

        return list;
    }
}

package com.preparedhypeboys.pnj.domain.calendar.dao;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.preparedhypeboys.pnj.domain.calendar.dto.EventDto;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class FlaskDao {

    @Value("${flask.host}")
    private String FLASK_HOST;

    private final Gson gson = new Gson();

    public List<EventDto> getInputTransport(String input) {

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> params = new HashMap<>();

        params.put("input", input);

        ResponseEntity<String> response = restTemplate.postForEntity(
            FLASK_HOST + "/trans/date", params, String.class
        );

        Type type = new TypeToken<List<EventDto>>() {
        }.getType();
        List<EventDto> list = gson.fromJson(response.getBody(), type);

        return list;
    }
}

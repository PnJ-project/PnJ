package com.preparedhypeboys.pnj.domain.calendar.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@JsonInclude(Include.NON_NULL)
@NoArgsConstructor
public class EventDto {

    private String id;

    private String summary;

    private String description;

    private Integer colorId;

    private DateTimeDto start;

    private DateTimeDto end;

    @Builder
    public EventDto(String id, String summary, String description, Integer colorId,
        DateTimeDto start,
        DateTimeDto end) {
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.colorId = colorId;
        this.start = start;
        this.end = end;
    }
}

package com.preparedhypeboys.pnj.domain.calendar.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class DateTimeDto {

    private String dateTime;
    
    private String timeZone = "Asia/Seoul";

    private String date;

}

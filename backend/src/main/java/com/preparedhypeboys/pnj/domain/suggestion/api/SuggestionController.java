package com.preparedhypeboys.pnj.domain.suggestion.api;

import static com.preparedhypeboys.pnj.domain.suggestion.constant.SuggestionResponseMessage.SUGGESTION_SUCCESS;

import com.google.gson.JsonObject;
import com.preparedhypeboys.pnj.domain.suggestion.constant.SuggestionResponseMessage;
import com.preparedhypeboys.pnj.domain.suggestion.service.SuggestionService;
import com.preparedhypeboys.pnj.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/suggestion")
public class SuggestionController {

    private final SuggestionService suggestionService;

    @GetMapping("/{memberId}/{timeMax}/{timeMin}")
    public ResponseEntity<ResponseDto<JsonObject>> getSuggestion(
            @PathVariable(value = "memberId") Long memberId,
        @PathVariable(value = "timeMax") String timeMax,
        @PathVariable(value = "timeMin") String timeMin
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(
            ResponseDto.create(SUGGESTION_SUCCESS.getMessage(),
                suggestionService.getSuggestionInfo(memberId, timeMax, timeMin))
        );
    }
}
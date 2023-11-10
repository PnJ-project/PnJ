package com.preparedhypeboys.pnj.domain.suggestion.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SuggestionResponseMessage {
    SUGGESTION_SUCCESS("추천 정보 반환 완료");

    private final String message;
}

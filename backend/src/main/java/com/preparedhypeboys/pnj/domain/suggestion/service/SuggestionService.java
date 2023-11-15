package com.preparedhypeboys.pnj.domain.suggestion.service;

import com.google.gson.JsonArray;

public interface SuggestionService {

    JsonArray getSuggestionInfo(Long memberId, String timeMax, String timeMin);

}

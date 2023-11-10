package com.preparedhypeboys.pnj.domain.suggestion.service;

import com.google.gson.JsonObject;

public interface SuggestionService {

    JsonObject getSuggestionInfo (Long memberId, String timeMax, String timeMin);

}

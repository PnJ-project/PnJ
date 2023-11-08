package com.preparedhypeboys.pnj.domain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.LoginResponseDto;

public interface OAuth2UserService {

    LoginResponseDto loginRedirectProcess(String code) throws JsonProcessingException;

    String getAccessTokenRefresh(String refreshToken) throws JsonProcessingException;
}

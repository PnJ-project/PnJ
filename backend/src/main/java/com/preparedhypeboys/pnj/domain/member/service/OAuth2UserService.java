package com.preparedhypeboys.pnj.domain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.LoginReponseDto;

public interface OAuth2UserService {

    LoginReponseDto loginRedirectProcess(String code) throws JsonProcessingException;

}

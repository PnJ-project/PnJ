package com.preparedhypeboys.pnj.domain.member.service;

import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.LoginResponseDto;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.TokenRefreshDto;
import com.preparedhypeboys.pnj.domain.member.entity.Member;

public interface OAuth2UserService {

    LoginResponseDto loginRedirectProcess(String code);

    Member getAccessTokenRefresh(Member member);

    TokenRefreshDto reCreateJwtToken(String refreshToken);
}

package com.preparedhypeboys.pnj.domain.member.api;


import static com.preparedhypeboys.pnj.domain.member.constant.MemberResponseMessage.LOGIN_START;
import static com.preparedhypeboys.pnj.domain.member.constant.MemberResponseMessage.TOKEN_REFRESH_SUCCESS;

import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.LoginResponseDto;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.TokenRefreshDto;
import com.preparedhypeboys.pnj.domain.member.service.OAuth2UserService;
import com.preparedhypeboys.pnj.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("hasAuthority('refreshToken')")
@RequiredArgsConstructor
@RequestMapping("/api/login")
@Slf4j
public class LoginController {

    private final OAuth2UserService oAuth2UserService;

    @GetMapping("")
    public ResponseEntity<ResponseDto<LoginResponseDto>> login(
        @RequestParam(name = "code") String code) {
        return ResponseEntity.status(HttpStatus.OK
        ).body(ResponseDto.create(LOGIN_START.getMessage(),
            oAuth2UserService.loginRedirectProcess(code))
        );
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<ResponseDto<TokenRefreshDto>> refresh(
        @RequestHeader String refreshToken) {
        return ResponseEntity.status(HttpStatus.OK
        ).body(ResponseDto.create(TOKEN_REFRESH_SUCCESS.getMessage(),
            oAuth2UserService.reCreateJwtToken(refreshToken))
        );
    }


}

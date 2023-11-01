package com.preparedhypeboys.pnj.domain.member.api;


import static com.preparedhypeboys.pnj.domain.member.constant.MemberResponseMessage.LOGIN_START;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.preparedhypeboys.pnj.domain.member.dto.MemberResponseDto.LoginResponseDto;
import com.preparedhypeboys.pnj.domain.member.service.OAuth2UserService;
import com.preparedhypeboys.pnj.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/login")
@Slf4j
public class LoginController {

    private final OAuth2UserService oAuth2UserService;

    @GetMapping("")
    public ResponseEntity<ResponseDto<LoginResponseDto>> login(
        @RequestParam(name = "code") String code)
        throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.OK
        ).body(ResponseDto.create(LOGIN_START.getMessage(),
            oAuth2UserService.loginRedirectProcess(code))
        );
    }

    // TODO : oauth 콜백 함수 작성
    @GetMapping("/oauth2/code/google")
    public ResponseEntity<ResponseDto<String>> callback() {

        log.info("콜백 완료");
        return null;
    }
}

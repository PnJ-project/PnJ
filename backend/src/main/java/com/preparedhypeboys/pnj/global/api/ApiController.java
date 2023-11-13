package com.preparedhypeboys.pnj.global.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "서버 상태 확인 컨트롤러")
@RestController
@RequiredArgsConstructor
public class ApiController {

    private final Environment env;

    @ApiOperation(value = "활성된 프로필 확인 API")
    @GetMapping("/profile")
    public String getProfile() {
        return Arrays.stream(env.getActiveProfiles())
            .findFirst()
            .orElse("");
    }

    @ApiOperation(value = "서버 헬스 체크 API")
    @GetMapping("/api/health")
    public String healthCheck() {
        return "UP";
    }
}

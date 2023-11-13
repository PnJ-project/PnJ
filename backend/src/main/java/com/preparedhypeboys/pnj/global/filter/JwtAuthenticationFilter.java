package com.preparedhypeboys.pnj.global.filter;

import static com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage.INVALID_TOKEN;

import com.preparedhypeboys.pnj.global.error.constant.ExceptionMessage;
import com.preparedhypeboys.pnj.global.error.token.TokenInvalidException;
import com.preparedhypeboys.pnj.global.util.JWTUtil;
import java.io.IOException;
import java.util.Collections;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        String token = jwtUtil.resolveToken((HttpServletRequest) request);

        SecurityContextHolder.clearContext();

        if (token != null && jwtUtil.validToken(token)) {
            Long memberId = jwtUtil.getMemberIdOfToken(token);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                memberId, null, Collections.emptyList()
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

        }
        chain.doFilter(request, response);
    }
}

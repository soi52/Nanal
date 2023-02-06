package com.dbd.nanal.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.oauth2.sdk.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;

import java.util.HashMap;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response,
        @NotNull FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = parseBearerToken(request);

            // 토큰 검사
            if (token != null && jwtTokenProvider.isValidateToken(token)) {
                // userId 가져오기. 위조된 경우 예외처리됨
                Authentication authentication = jwtTokenProvider.getAuthentication(token);

                // SecurityContextHolder에 등록
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (ExpiredJwtException e) {
            logger.info("토큰 만료"+e.getMessage());
            HashMap<String, Object> responseDTO = new HashMap<>();
            responseDTO.put("responseMessage", "accessToken 만료");
            new ObjectMapper().writeValue(response.getWriter(), responseDTO);
        }

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request) {
        // Http 요청의 헤더를 파싱해 Bearer 토큰을 리턴함
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }


//    // 토크 인증 테스트용 코드
//    @Override
//    protected void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response,
//        @NotNull FilterChain filterChain) throws ServletException, IOException {
//        try {
//            logger.info("request" + request);
//            // 요청에서 토큰 가져오기
//            String token = parseBearerToken(request);
//            logger.info("doFilterInternal - 토큰 값 추출. token : " + token);
//
//            // 토큰 검사
//            if (token != null && jwtTokenProvider.isValidateToken(token)) {
//                // userId 가져오기. 위조된 경우 예외처리됨
//                Authentication authentication = jwtTokenProvider.getAuthentication(token);
//
//                // SecurityContextHolder에 등록
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//                logger.info("doFilterInternal - 토큰 값 유효성 체크 완료");
//            }
//        } catch (Exception e) {
//            logger.debug("user authentication 세팅 실패" + e);
//        }
//
//        filterChain.doFilter(request, response);
//    }
//
//    private String parseBearerToken(HttpServletRequest request) {
//
//        logger.info("request" + request);
//        String bearerToken = null;
//        // 요청에서 토큰 가져오기
//        Cookie[] cookies = request.getCookies();
//        for(Cookie cookie:cookies) {
//            if(cookie.getName().equals("accessToken")) {
//                bearerToken = cookie.getValue();
//                logger.info("bearerToken :"+bearerToken);
//            }
//        }
//
//
//        if (StringUtils.hasText(bearerToken)) {
//            return bearerToken;
//        }
//        return null;
//    }
}

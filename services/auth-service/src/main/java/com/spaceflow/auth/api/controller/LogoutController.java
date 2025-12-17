package com.spaceflow.auth.api.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for logout endpoint.
 * Clears the authentication cookie.
 */
@RestController
@RequestMapping("/api/v1")
public class LogoutController {

    private final String cookieName;
    private final boolean cookieSecure;

    public LogoutController(
            @Value("${auth.cookie.name:spaceflow_auth}") String cookieName,
            @Value("${auth.cookie.secure:false}") boolean cookieSecure) {
        this.cookieName = cookieName;
        this.cookieSecure = cookieSecure;
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie cookie = ResponseCookie.from(cookieName, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }
}



package com.spaceflow.auth.api.controller;

import com.spaceflow.auth.api.dto.AuthenticationRequest;
import com.spaceflow.auth.api.dto.AuthenticationResponse;
import com.spaceflow.auth.security.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

/**
 * Controller for authentication endpoint.
 * Matches OpenAPI path: /authenticate
 */
@RestController
@RequestMapping("/api/v1")
public class AuthenticationController {

    private final AuthService authService;
    private final String cookieName;
    private final boolean cookieSecure;

    public AuthenticationController(
            AuthService authService,
            @Value("${auth.cookie.name:spaceflow_auth}") String cookieName,
            @Value("${auth.cookie.secure:false}") boolean cookieSecure) {
        this.authService = authService;
        this.cookieName = cookieName;
        this.cookieSecure = cookieSecure;
    }

    /**
     * Authenticates an identity using credentials and returns confirmation with role.
     * Matches OpenAPI operation: authenticate
     *
     * @param request Authentication request containing username and password
     * @return AuthenticationResponse on success (200), ErrorResponse on failure (401)
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
        // For now we treat "username" as the user's email address.
        AuthService.AuthenticationResult result =
                authService.authenticate(request.getUsername(), request.getPassword());

        ResponseCookie cookie = ResponseCookie.from(cookieName, result.getToken())
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                // Cookie can be a session cookie; JWT itself carries the 1h expiry.
                .sameSite("Lax")
                .build();

        AuthenticationResponse response = new AuthenticationResponse();
        response.setIdentityReference(result.getUserId().toString());
        response.setRole(result.getRole());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }
}


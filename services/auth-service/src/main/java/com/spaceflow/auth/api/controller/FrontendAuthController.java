package com.spaceflow.auth.api.controller;

import com.spaceflow.auth.api.dto.FrontendAuthSessionResponse;
import com.spaceflow.auth.api.dto.FrontendAuthUser;
import com.spaceflow.auth.api.dto.FrontendLoginRequest;
import com.spaceflow.auth.domain.User;
import com.spaceflow.auth.domain.UserRepository;
import com.spaceflow.auth.security.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * Thin facade that speaks the frontend's /auth/* contract while delegating
 * to the core AuthService.
 *
 * This keeps the SPA API stable (POST /auth/login, GET /auth/validate)
 * without changing the underlying domain-oriented /api/v1/* endpoints.
 */
@RestController
@RequestMapping({"/auth", "/api/v1/auth"})
public class FrontendAuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final String cookieName;
    private final boolean cookieSecure;

    public FrontendAuthController(
            AuthService authService,
            UserRepository userRepository,
            @Value("${auth.cookie.name:spaceflow_auth}") String cookieName,
            @Value("${auth.cookie.secure:false}") boolean cookieSecure) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.cookieName = cookieName;
        this.cookieSecure = cookieSecure;
    }

    /**
     * Frontend login endpoint.
     *
     * Request:  POST /auth/login with { "email", "password" }
     * Response: { "user": { "id", "role", "email" } }
     */
    @PostMapping("/login")
    public ResponseEntity<FrontendAuthSessionResponse> login(
            @Valid @RequestBody FrontendLoginRequest request) {

        AuthService.AuthenticationResult result =
                authService.authenticate(request.getEmail(), request.getPassword());

        ResponseCookie cookie = ResponseCookie.from(cookieName, result.getToken())
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .sameSite("Lax")
                .build();

        // Fetch user to get email for frontend display
        Optional<User> userOpt = userRepository.findById(result.getUserId());
        String email = userOpt.map(User::getEmail).orElse(request.getEmail());
        
        FrontendAuthUser user = new FrontendAuthUser(result.getUserId(), result.getRole(), email);
        FrontendAuthSessionResponse response = new FrontendAuthSessionResponse(user);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    /**
     * Frontend session validation endpoint.
     *
     * Request:  GET /auth/validate with auth cookie attached
     * Response: { "user": { "id", "role", "email" } } when valid, or { "user": null } when not.
     */
    @GetMapping("/validate")
    public ResponseEntity<FrontendAuthSessionResponse> validate(HttpServletRequest request) {
        String token = extractAuthCookie(request);
        if (token == null || token.isBlank()) {
            return ResponseEntity.ok(new FrontendAuthSessionResponse(null));
        }

        AuthService.ValidationResult result = authService.validate(token);
        
        // Fetch user to get email for frontend display
        Optional<User> userOpt = userRepository.findById(result.getUserId());
        String email = userOpt.map(User::getEmail).orElse(null);
        
        FrontendAuthUser user = new FrontendAuthUser(result.getUserId(), result.getRole(), email);

        return ResponseEntity.ok(new FrontendAuthSessionResponse(user));
    }

    private String extractAuthCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}



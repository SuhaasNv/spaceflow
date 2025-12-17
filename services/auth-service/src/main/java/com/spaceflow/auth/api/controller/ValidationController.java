package com.spaceflow.auth.api.controller;

import com.spaceflow.auth.api.dto.ValidationRequest;
import com.spaceflow.auth.api.dto.ValidationResponse;
import com.spaceflow.auth.security.AuthService;
import com.spaceflow.auth.security.exception.AuthenticationException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for validation endpoint.
 * Matches OpenAPI path: /validate
 */
@RestController
@RequestMapping("/api/v1")
public class ValidationController {

    private final AuthService authService;
    private final String cookieName;

    public ValidationController(
            AuthService authService,
            @Value("${auth.cookie.name:SPACEFLOW_AUTH}") String cookieName) {
        this.authService = authService;
        this.cookieName = cookieName;
    }

    /**
     * Validates an existing identity and returns associated role.
     * Matches OpenAPI operation: validate
     *
     * @param request Validation request containing identity reference
     * @return ValidationResponse on success (200), ErrorResponse on failure (401)
     */
    @PostMapping("/validate")
    public ResponseEntity<ValidationResponse> validate(@Valid @RequestBody ValidationRequest request,
                                                       HttpServletRequest httpRequest) {
        // Identity is determined by the HTTP-only cookie, not the request body.
        String token = extractTokenFromCookies(httpRequest);
        AuthService.ValidationResult result = authService.validate(token);

        ValidationResponse response = new ValidationResponse();
        response.setValid(true);
        response.setIdentityReference(result.getUserId().toString());
        response.setRole(result.getRole());

        return ResponseEntity.ok(response);
    }

    private String extractTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new AuthenticationException("Authentication cookie is missing");
        }
        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        throw new AuthenticationException("Authentication cookie is missing");
    }
}


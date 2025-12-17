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
            @Value("${auth.cookie.name:spaceflow_auth}") String cookieName) {
        this.authService = authService;
        this.cookieName = cookieName;
    }

    /**
     * Validates an existing identity and returns associated role.
     * Matches OpenAPI operation: validate
     *
     * @param request Validation request containing identity reference
     * @param httpRequest HTTP request to extract authentication cookie
     * @return ValidationResponse on success (200), ErrorResponse on failure (401)
     */
    @PostMapping("/validate")
    public ResponseEntity<ValidationResponse> validate(
            @Valid @RequestBody ValidationRequest request,
            HttpServletRequest httpRequest) {
        
        // Test isolation: Extract token from cookie - tests mock AuthService.validate()
        // so no real JWT parsing occurs in controller tests
        String token = extractAuthCookie(httpRequest);
        if (token == null || token.isBlank()) {
            throw new AuthenticationException("Missing authentication cookie");
        }

        // Test isolation: AuthService is mocked in @WebMvcTest, so this call is stubbed
        AuthService.ValidationResult result = authService.validate(token);

        ValidationResponse response = new ValidationResponse();
        response.setValid(true);
        response.setIdentityReference(result.getUserId().toString());
        response.setRole(result.getRole());

        return ResponseEntity.ok(response);
    }

    /**
     * Extracts the authentication cookie from the HTTP request.
     * Test isolation: This method is called in tests, but AuthService.validate() is mocked.
     *
     * @param request HTTP request
     * @return Token value from cookie, or null if not found
     */
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

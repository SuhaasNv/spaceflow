package com.spaceflow.auth.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.spaceflow.auth.domain.User;

import java.util.UUID;

/**
 * Core authentication service used by controllers.
 *
 * Keeps all auth logic within the Auth Service boundary.
 */
public interface AuthService {

    AuthenticationResult authenticate(String email, String rawPassword);

    ValidationResult validate(String token);

    /**
     * Result of a successful authentication.
     */
    class AuthenticationResult {
        private final UUID userId;
        private final String role;
        private final String token;

        public AuthenticationResult(UUID userId, String role, String token) {
            this.userId = userId;
            this.role = role;
            this.token = token;
        }

        public UUID getUserId() {
            return userId;
        }

        public String getRole() {
            return role;
        }

        public String getToken() {
            return token;
        }
    }

    /**
     * Result of a successful token validation.
     */
    class ValidationResult {
        private final UUID userId;
        private final String role;
        private final DecodedJWT decodedJWT;

        public ValidationResult(UUID userId, String role, DecodedJWT decodedJWT) {
            this.userId = userId;
            this.role = role;
            this.decodedJWT = decodedJWT;
        }

        public UUID getUserId() {
            return userId;
        }

        public String getRole() {
            return role;
        }

        public DecodedJWT getDecodedJWT() {
            return decodedJWT;
        }
    }
}




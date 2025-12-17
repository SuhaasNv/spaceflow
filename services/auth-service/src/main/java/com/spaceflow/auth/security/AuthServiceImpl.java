package com.spaceflow.auth.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.spaceflow.auth.domain.User;
import com.spaceflow.auth.domain.UserRepository;
import com.spaceflow.auth.security.exception.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

/**
 * Default implementation of {@link AuthService} using PostgreSQL and JWT.
 */
@Service
public class AuthServiceImpl implements AuthService {

    private static final String ACTIVE_STATUS = "ACTIVE";

    private final UserRepository userRepository;
    private final AuthTokenService authTokenService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, AuthTokenService authTokenService) {
        this.userRepository = userRepository;
        this.authTokenService = authTokenService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public AuthenticationResult authenticate(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmailAndStatus(email, ACTIVE_STATUS);
        User user = userOpt.orElseThrow(() ->
                new AuthenticationException("Invalid credentials"));

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new AuthenticationException("Invalid credentials");
        }

        String token = authTokenService.generateToken(user);
        return new AuthenticationResult(user.getId(), user.getRole(), token);
    }

    @Override
    public ValidationResult validate(String token) {
        DecodedJWT decoded = authTokenService.validateToken(token);
        UUID userId = UUID.fromString(decoded.getSubject());
        String role = decoded.getClaim("role").asString();

        // Optional: verify user still exists and is active
        userRepository.findById(userId)
                .filter(u -> ACTIVE_STATUS.equals(u.getStatus()))
                .orElseThrow(() -> new AuthenticationException("Invalid or inactive user"));

        return new ValidationResult(userId, role, decoded);
    }
}




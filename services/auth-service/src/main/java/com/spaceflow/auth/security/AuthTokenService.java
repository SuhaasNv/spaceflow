package com.spaceflow.auth.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.spaceflow.auth.domain.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;

/**
 * Service responsible for issuing and validating JWT tokens.
 *
 * Tokens are signed using HS256 and contain:
 * - sub: user id
 * - role: user role
 * - iat: issued at
 * - exp: expiry (configurable, default 1 hour)
 *
 * TODO: In future, extend this to support richer IAM constructs
 * (scopes, permissions, tenant, etc.).
 */
@Component
public class AuthTokenService {

    private final Algorithm algorithm;
    private final JWTVerifier verifier;
    private final long expirationSeconds;

    public AuthTokenService(
            @Value("${auth.jwt.secret:dev-secret-change-me}") String secret,
            @Value("${auth.jwt.expiration-seconds:3600}") long expirationSeconds) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.verifier = JWT.require(algorithm).build();
        this.expirationSeconds = expirationSeconds;
    }

    public String generateToken(User user) {
        Instant now = Instant.now();
        Instant expiresAt = now.plusSeconds(expirationSeconds);

        return JWT.create()
                .withSubject(user.getId().toString())
                .withClaim("role", user.getRole())
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expiresAt))
                .sign(algorithm);
    }

    public DecodedJWT validateToken(String token) {
        return verifier.verify(token);
    }
}





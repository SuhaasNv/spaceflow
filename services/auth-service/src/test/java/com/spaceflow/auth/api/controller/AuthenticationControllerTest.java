package com.spaceflow.auth.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spaceflow.auth.api.dto.AuthenticationRequest;
import com.spaceflow.auth.security.AuthService;
import com.spaceflow.auth.security.exception.AuthenticationException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for AuthenticationController.
 * Tests API wiring and contract compliance only.
 */
@WebMvcTest(AuthenticationController.class)
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @Test
    void authenticate_WithValidCredentials_Returns200AndSetsCookie() throws Exception {
        // Given
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername("user@example.com");
        request.setPassword("testpassword");
        UUID userId = UUID.randomUUID();

        given(authService.authenticate(eq("user@example.com"), eq("testpassword")))
                .willReturn(new AuthService.AuthenticationResult(userId, "USER", "test-token"));

        // When & Then
        mockMvc.perform(post("/api/v1/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                        .andExpect(status().isOk())
                        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                        .andExpect(jsonPath("$.identityReference").value(userId.toString()))
                        .andExpect(jsonPath("$.role").value("USER"))
                        .andExpect(header().exists("Set-Cookie"))
                        .andExpect(header().string("Set-Cookie", org.hamcrest.Matchers.containsString("spaceflow_auth=")));
    }

    @Test
    void authenticate_WithInvalidCredentials_Returns401() throws Exception {
        // Given
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername("user@example.com");
        request.setPassword("wrongpassword");

        given(authService.authenticate(eq("user@example.com"), eq("wrongpassword")))
                .willThrow(new AuthenticationException("Invalid credentials"));

        // When & Then
        mockMvc.perform(post("/api/v1/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("AUTHENTICATION_FAILED"));
    }

    @Test
    void authenticate_WithMissingUsername_Returns400() throws Exception {
        // Given
        AuthenticationRequest request = new AuthenticationRequest();
        request.setPassword("testpassword");
        // username is null

        // When & Then
        mockMvc.perform(post("/api/v1/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void authenticate_WithMissingPassword_Returns400() throws Exception {
        // Given
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername("testuser");
        // password is null

        // When & Then
        mockMvc.perform(post("/api/v1/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void authenticate_WithEmptyUsername_Returns400() throws Exception {
        // Given
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername("");
        request.setPassword("testpassword");

        // When & Then
        mockMvc.perform(post("/api/v1/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void authenticate_WithEmptyPassword_Returns400() throws Exception {
        // Given
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername("testuser");
        request.setPassword("");

        // When & Then
        mockMvc.perform(post("/api/v1/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void authenticate_EndpointIsReachable() throws Exception {
        // Given
        AuthenticationRequest request = new AuthenticationRequest();
        request.setUsername("user@example.com");
        request.setPassword("testpassword");
        UUID userId = UUID.randomUUID();

        // For reachability we still mock a simple successful authentication
        given(authService.authenticate(eq("user@example.com"), eq("testpassword")))
                .willReturn(new AuthService.AuthenticationResult(userId, "USER", "test-token"));

        // When & Then - Verify endpoint exists and is accessible
        mockMvc.perform(post("/api/v1/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    // TODO: Add tests for authentication logic when implemented:
    // - Test successful authentication with valid credentials
    // - Test authentication failure with invalid credentials (should return 401)
    // - Test authentication failure with non-existent user (should return 401)
    // - Test response contains correct identityReference format
    // - Test response contains valid role value
}


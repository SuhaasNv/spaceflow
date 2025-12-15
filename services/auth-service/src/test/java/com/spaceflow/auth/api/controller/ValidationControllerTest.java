package com.spaceflow.auth.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spaceflow.auth.api.dto.ValidationRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for ValidationController.
 * Tests API wiring and contract compliance only.
 */
@WebMvcTest(ValidationController.class)
class ValidationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void validate_WithValidRequest_Returns200() throws Exception {
        // Given
        ValidationRequest request = new ValidationRequest();
        request.setIdentityReference("identity-123");

        // When & Then
        mockMvc.perform(post("/api/v1/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.valid").exists())
                .andExpect(jsonPath("$.identityReference").exists())
                .andExpect(jsonPath("$.role").exists());
    }

    @Test
    void validate_WithMissingIdentityReference_Returns400() throws Exception {
        // Given
        ValidationRequest request = new ValidationRequest();
        // identityReference is null

        // When & Then
        mockMvc.perform(post("/api/v1/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void validate_WithEmptyIdentityReference_Returns400() throws Exception {
        // Given
        ValidationRequest request = new ValidationRequest();
        request.setIdentityReference("");

        // When & Then
        mockMvc.perform(post("/api/v1/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void validate_EndpointIsReachable() throws Exception {
        // Given
        ValidationRequest request = new ValidationRequest();
        request.setIdentityReference("identity-123");

        // When & Then - Verify endpoint exists and is accessible
        mockMvc.perform(post("/api/v1/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void validate_ResponseContainsValidField() throws Exception {
        // Given
        ValidationRequest request = new ValidationRequest();
        request.setIdentityReference("identity-123");

        // When & Then - Verify response structure matches OpenAPI schema
        mockMvc.perform(post("/api/v1/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.valid").isBoolean())
                .andExpect(jsonPath("$.identityReference").value("identity-123"));
    }

    // TODO: Add tests for validation logic when implemented:
    // - Test successful validation with valid identity reference (should return valid=true)
    // - Test validation failure with invalid identity reference (should return 401)
    // - Test validation failure with non-existent identity (should return 401)
    // - Test validation failure with expired identity (should return 401)
    // - Test response contains correct identityReference
    // - Test response contains valid role value
}


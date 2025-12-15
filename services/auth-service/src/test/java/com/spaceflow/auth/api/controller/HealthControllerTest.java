package com.spaceflow.auth.api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for HealthController.
 * Tests API wiring and contract compliance only.
 */
@WebMvcTest(HealthController.class)
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void health_Returns200() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/v1/health"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").exists())
                .andExpect(jsonPath("$.service").exists());
    }

    @Test
    void health_ReturnsCorrectStatusValue() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/v1/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").value("auth-service"));
    }

    @Test
    void health_EndpointIsReachable() throws Exception {
        // When & Then - Verify endpoint exists and is accessible
        mockMvc.perform(get("/api/v1/health"))
                .andExpect(status().isOk());
    }

    @Test
    void health_ReturnsJsonContentType() throws Exception {
        // When & Then - Verify content type is JSON
        mockMvc.perform(get("/api/v1/health"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}


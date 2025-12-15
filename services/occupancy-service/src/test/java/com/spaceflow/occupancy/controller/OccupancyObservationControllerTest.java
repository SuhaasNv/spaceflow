package com.spaceflow.occupancy.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class OccupancyObservationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("POST /api/v1/occupancy/observations returns 201 and Observation payload for valid request")
    void recordObservation_validRequest_returnsCreatedObservation() throws Exception {
        String requestBody = """
                {
                  "spaceId": "space-1",
                  "observedStartTime": "2024-01-01T09:00:00Z",
                  "observedEndTime": "2024-01-01T10:00:00Z",
                  "occupancyStatus": "occupied",
                  "notes": "stub observation"
                }
                """;

        mockMvc.perform(post("/api/v1/occupancy/observations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.observationId").isNotEmpty())
                .andExpect(jsonPath("$.spaceId").value("space-1"))
                .andExpect(jsonPath("$.occupancyStatus").value("occupied"))
                .andExpect(jsonPath("$.recordedAt").isNotEmpty());

        // TODO: add tests for business rules when observation recording logic is implemented
    }

    @Test
    @DisplayName("POST /api/v1/occupancy/observations returns 400 with ErrorResponse for invalid payload")
    void recordObservation_missingRequiredField_returnsBadRequest() throws Exception {
        // Missing spaceId (required) in request
        String requestBody = """
                {
                  "observedStartTime": "2024-01-01T09:00:00Z",
                  "observedEndTime": "2024-01-01T10:00:00Z",
                  "occupancyStatus": "occupied"
                }
                """;

        mockMvc.perform(post("/api/v1/occupancy/observations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").isNotEmpty())
                .andExpect(jsonPath("$.message").isNotEmpty());
    }

    @Test
    @DisplayName("GET /api/v1/occupancy/observations returns 200 with observations array")
    void getObservations_validRequest_returnsOkWithArray() throws Exception {
        mockMvc.perform(get("/api/v1/occupancy/observations")
                        .param("spaceId", "space-1")
                        .param("startTime", "2024-01-01T09:00:00Z")
                        .param("endTime", "2024-01-01T10:00:00Z"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.observations").isArray());

        // TODO: add tests for returned observations once retrieval logic is implemented
    }

    @Test
    @DisplayName("GET /api/v1/occupancy/observations returns 400 with ErrorResponse when required param is missing")
    void getObservations_missingSpaceId_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/v1/occupancy/observations")
                        .param("startTime", "2024-01-01T09:00:00Z")
                        .param("endTime", "2024-01-01T10:00:00Z"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").isNotEmpty())
                .andExpect(jsonPath("$.message").isNotEmpty());
    }

    @Test
    @DisplayName("PATCH /api/v1/occupancy/observations/{id} returns 200 and Observation payload for valid request")
    void updateObservation_validRequest_returnsOkObservation() throws Exception {
        String requestBody = """
                {
                  "observedStartTime": "2024-01-01T09:15:00Z",
                  "observedEndTime": "2024-01-01T10:15:00Z",
                  "occupancyStatus": "occupied",
                  "notes": "corrected times"
                }
                """;

        mockMvc.perform(patch("/api/v1/occupancy/observations/{observationId}", "obs-123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.observationId").value("obs-123"))
                .andExpect(jsonPath("$.occupancyStatus").value("occupied"))
                .andExpect(jsonPath("$.spaceId").isNotEmpty())
                .andExpect(jsonPath("$.recordedAt").isNotEmpty())
                .andExpect(jsonPath("$.updatedAt").isNotEmpty());

        // TODO: add tests for not-found and correction logic once implemented
    }
}



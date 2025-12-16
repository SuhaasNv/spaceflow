package com.spaceflow.analytics.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AnalyticsController.class)
class AnalyticsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @DisplayName("GET /api/v1/utilization")
    class UtilizationEndpoint {

        @Test
        @DisplayName("returns 200 and a UtilizationResponse structure when required params are provided")
        void getUtilization_okWithRequiredParams() throws Exception {
            mockMvc.perform(get("/api/v1/utilization")
                            .param("scopeType", "WORKSPACE")
                            .param("from", "2024-01-01T00:00:00Z")
                            .param("to", "2024-01-31T23:59:59Z")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    // validate top-level response structure only
                    .andExpect(jsonPath("$.scope").exists())
                    .andExpect(jsonPath("$.timeRange").exists())
                    .andExpect(jsonPath("$.granularity").exists())
                    .andExpect(jsonPath("$.notes").exists())
                    .andExpect(jsonPath("$.points").exists());
            // TODO: In future, add assertions about utilization analytics correctness once logic is implemented.
        }

        @Test
        @DisplayName("returns 400 when required parameters are missing")
        void getUtilization_missingRequiredParams_returnsBadRequest() throws Exception {
            mockMvc.perform(get("/api/v1/utilization")
                            // missing required scopeType/from/to
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/booking-usage")
    class BookingUsageEndpoint {

        @Test
        @DisplayName("returns 200 and a BookingUsageResponse structure when required params are provided")
        void getBookingUsage_okWithRequiredParams() throws Exception {
            mockMvc.perform(get("/api/v1/booking-usage")
                            .param("scopeType", "WORKSPACE")
                            .param("from", "2024-01-01T00:00:00Z")
                            .param("to", "2024-01-31T23:59:59Z")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    // validate top-level response structure only
                    .andExpect(jsonPath("$.scope").exists())
                    .andExpect(jsonPath("$.timeRange").exists())
                    .andExpect(jsonPath("$.granularity").exists())
                    .andExpect(jsonPath("$.notes").exists())
                    .andExpect(jsonPath("$.buckets").exists());
            // TODO: In future, assert booking vs usage metrics (rates, counts) once analytics logic exists.
        }

        @Test
        @DisplayName("returns 400 when required parameters are missing")
        void getBookingUsage_missingRequiredParams_returnsBadRequest() throws Exception {
            mockMvc.perform(get("/api/v1/booking-usage")
                            // missing required scopeType/from/to
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/patterns")
    class PatternInsightsEndpoint {

        @Test
        @DisplayName("returns 200 and a PatternInsightsResponse structure")
        void getPatterns_ok() throws Exception {
            mockMvc.perform(get("/api/v1/patterns")
                            .param("scopeType", "WORKSPACE")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    // validate top-level response structure only
                    .andExpect(jsonPath("$.scope").exists())
                    .andExpect(jsonPath("$.timeRange").exists())
                    .andExpect(jsonPath("$.notes").exists())
                    .andExpect(jsonPath("$.insights").exists());
            // TODO: In future, assert specific insight types, confidence, and pattern details once implemented.
        }
    }

    @Nested
    @DisplayName("GET /api/v1/segments/comparisons")
    class SegmentComparisonEndpoint {

        @Test
        @DisplayName("returns 200 and a SegmentComparisonResponse structure when required params are provided")
        void getSegmentComparisons_okWithRequiredParams() throws Exception {
            mockMvc.perform(get("/api/v1/segments/comparisons")
                            .param("scopeType", "WORKSPACE")
                            .param("from", "2024-01-01T00:00:00Z")
                            .param("to", "2024-01-31T23:59:59Z")
                            .param("segmentBy", "TEAM")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    // validate top-level response structure only
                    .andExpect(jsonPath("$.scope").exists())
                    .andExpect(jsonPath("$.timeRange").exists())
                    .andExpect(jsonPath("$.segmentBy").exists())
                    .andExpect(jsonPath("$.notes").exists())
                    .andExpect(jsonPath("$.segments").exists());
            // TODO: In future, assert segment-level metrics and comparisons once analytics logic is implemented.
        }

        @Test
        @DisplayName("returns 400 when required parameters are missing")
        void getSegmentComparisons_missingRequiredParams_returnsBadRequest() throws Exception {
            mockMvc.perform(get("/api/v1/segments/comparisons")
                            // missing required scopeType/from/to/segmentBy
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("GET /api/v1/snapshots")
    class SnapshotEndpoint {

        @Test
        @DisplayName("returns 200 and a SnapshotResponse structure")
        void getSnapshots_ok() throws Exception {
            mockMvc.perform(get("/api/v1/snapshots")
                            .param("scopeType", "WORKSPACE")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    // validate top-level response structure only
                    .andExpect(jsonPath("$.scope").exists())
                    .andExpect(jsonPath("$.summary").exists());
            // TODO: In future, assert snapshot summary contents once baseline/snapshot calculation logic exists.
        }
    }
}






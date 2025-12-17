package com.spaceflow.aiengine.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = RecommendationsController.class)
class RecommendationsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private com.spaceflow.aiengine.service.HeuristicRecommendationService heuristicRecommendationService;

    @Test
    @DisplayName("GET /recommendations returns 200 and basic response structure for valid request")
    void getRecommendations_validRequest_returnsOk() throws Exception {
        com.spaceflow.aiengine.dto.RecommendationsResponse stub =
                new com.spaceflow.aiengine.dto.RecommendationsResponse();
        com.spaceflow.aiengine.dto.ContextScope scope = new com.spaceflow.aiengine.dto.ContextScope();
        scope.setType("building");
        scope.setId("HQ");
        stub.setScope(scope);
        stub.setRecommendations(java.util.Collections.emptyList());

        org.mockito.Mockito.when(heuristicRecommendationService.generateRecommendations(
                        org.mockito.Mockito.any(),
                        org.mockito.Mockito.any(),
                        org.mockito.Mockito.any(),
                        org.mockito.Mockito.any()))
                .thenReturn(stub);

        mockMvc.perform(get("/api/v1/recommendations")
                        .param("scope", "building:HQ")
                        .param("limit", "10")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.scope.type").exists())
                .andExpect(jsonPath("$.scope.id").exists())
                .andExpect(jsonPath("$.recommendations").isArray());

        // TODO: Add tests for additional response fields once recommendation logic is implemented.
    }

    @Test
    @DisplayName("GET /recommendations without required scope parameter returns 400")
    void getRecommendations_missingScope_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/v1/recommendations")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        // TODO: Assert error payload fields (code, message, traceId) once error handling is finalized.
    }

    @Test
    @DisplayName("GET /recommendations with invalid limit parameter returns 400")
    void getRecommendations_invalidLimit_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/v1/recommendations")
                        .param("scope", "building:HQ")
                        .param("limit", "not-a-number")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        // TODO: Assert error payload fields (code, message, traceId) once error handling is finalized.
    }
}



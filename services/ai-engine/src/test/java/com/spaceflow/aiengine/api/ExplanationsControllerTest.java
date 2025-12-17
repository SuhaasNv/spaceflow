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

@WebMvcTest(controllers = ExplanationsController.class)
class ExplanationsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private com.spaceflow.aiengine.service.HeuristicRecommendationService heuristicRecommendationService;

    @Test
    @DisplayName("GET /recommendations/{id}/explanation returns 200 and basic response structure")
    void getRecommendationExplanation_validRequest_returnsOk() throws Exception {
        com.spaceflow.aiengine.dto.RecommendationExplanation explanation =
                new com.spaceflow.aiengine.dto.RecommendationExplanation();
        explanation.setRecommendationId("rec_12345");
        explanation.setSummary("stub");

        org.mockito.Mockito.when(heuristicRecommendationService.explain(
                org.mockito.Mockito.eq("rec_12345"),
                org.mockito.Mockito.any()))
                .thenReturn(explanation);

        mockMvc.perform(get("/api/v1/recommendations/{recommendationId}/explanation", "rec_12345")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.recommendationId").value("rec_12345"))
                .andExpect(jsonPath("$.summary").exists());

        // TODO: Add tests for contributingSignals, confidenceBreakdown, and caveats
        //       once explanation generation logic is implemented.
    }
}







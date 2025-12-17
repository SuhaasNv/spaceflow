package com.spaceflow.aiengine.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ExplanationsController.class)
class ExplanationsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /recommendations/{id}/explanation returns 200 and basic response structure")
    void getRecommendationExplanation_validRequest_returnsOk() throws Exception {
        mockMvc.perform(get("/api/v1/recommendations/{recommendationId}/explanation", "rec_12345")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.recommendationId").value("rec_12345"))
                .andExpect(jsonPath("$.summary").exists());

        // TODO: Add tests for contributingSignals, confidenceBreakdown, and caveats
        //       once explanation generation logic is implemented.
    }
}







package com.spaceflow.aiengine.api;

import com.spaceflow.aiengine.dto.RecommendationExplanation;
import com.spaceflow.aiengine.service.HeuristicRecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Validated
public class ExplanationsController {

    private final HeuristicRecommendationService recommendationService;

    public ExplanationsController(HeuristicRecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/recommendations/{recommendationId}/explanation")
    public ResponseEntity<RecommendationExplanation> getRecommendationExplanation(
            @PathVariable("recommendationId") String recommendationId,
            @RequestParam(name = "scope", required = false) String scope
    ) {
        // Explanation generation is deterministic and heuristic-only.
        RecommendationExplanation explanation = recommendationService.explain(recommendationId, scope);
        return ResponseEntity.ok(explanation);
    }
}







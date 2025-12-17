package com.spaceflow.aiengine.api;

import com.spaceflow.aiengine.dto.ContextScope;
import com.spaceflow.aiengine.dto.RecommendationsResponse;
import com.spaceflow.aiengine.dto.TimeRange;
import com.spaceflow.aiengine.service.HeuristicRecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/v1")
@Validated
public class RecommendationsController {

    private final HeuristicRecommendationService recommendationService;

    public RecommendationsController(HeuristicRecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/recommendations")
    public ResponseEntity<RecommendationsResponse> getRecommendations(
            @RequestParam(name = "scope") String scope,
            @RequestParam(name = "timeRangeStart", required = false) String timeRangeStart,
            @RequestParam(name = "timeRangeEnd", required = false) String timeRangeEnd,
            @RequestParam(name = "focus", required = false) String focus,
            @RequestParam(name = "limit", required = false) Integer limit
    ) {
        ContextScope contextScope = parseScope(scope);
        TimeRange timeRange = buildTimeRange(timeRangeStart, timeRangeEnd);

        RecommendationsResponse response = recommendationService.generateRecommendations(
                contextScope,
                timeRange,
                focus,
                limit
        );

        return ResponseEntity.ok(response);
    }

    private ContextScope parseScope(String scope) {
        ContextScope contextScope = new ContextScope();
        // Basic parsing of scope into type:id.
        // This keeps the logic deterministic and explainable.
        if (scope != null && scope.contains(":")) {
            String[] parts = scope.split(":", 2);
            contextScope.setType(parts[0]);
            contextScope.setId(parts[1]);
        } else {
            contextScope.setType("unknown");
            contextScope.setId(scope);
        }
        return contextScope;
    }

    private TimeRange buildTimeRange(String start, String end) {
        TimeRange timeRange = new TimeRange();
        timeRange.setStart(start);
        timeRange.setEnd(end);

        // Lenient validation only; errors are intentionally ignored to keep this advisory.
        validateOptionalDateTime(start);
        validateOptionalDateTime(end);

        return timeRange;
    }

    private void validateOptionalDateTime(String value) {
        if (value == null || value.isEmpty()) {
            return;
        }
        try {
            OffsetDateTime.parse(value);
        } catch (DateTimeParseException ignored) {
            // For the skeleton implementation we ignore parsing issues and rely
            // on future validation and proper error mapping.
        }
    }
}







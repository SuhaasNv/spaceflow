package com.spaceflow.aiengine.api;

import com.spaceflow.aiengine.dto.ContextScope;
import com.spaceflow.aiengine.dto.Recommendation;
import com.spaceflow.aiengine.dto.RecommendationsResponse;
import com.spaceflow.aiengine.dto.TimeRange;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.Collections;

@RestController
@RequestMapping("/api/v1")
@Validated
public class RecommendationsController {

    @GetMapping("/recommendations")
    public ResponseEntity<RecommendationsResponse> getRecommendations(
            @RequestParam(name = "scope") String scope,
            @RequestParam(name = "timeRangeStart", required = false) String timeRangeStart,
            @RequestParam(name = "timeRangeEnd", required = false) String timeRangeEnd,
            @RequestParam(name = "focus", required = false) String focus,
            @RequestParam(name = "limit", required = false) Integer limit
    ) {
        // TODO: Implement retrieval of advisory recommendations from AI Engine logic.
        // This implementation must remain read-only and advisory.

        RecommendationsResponse response = new RecommendationsResponse();

        ContextScope contextScope = new ContextScope();
        // Basic parsing of scope into type:id for the stub implementation.
        // TODO: Replace with real scope parsing/validation once the domain model is defined.
        if (scope.contains(":")) {
            String[] parts = scope.split(":", 2);
            contextScope.setType(parts[0]);
            contextScope.setId(parts[1]);
        } else {
            contextScope.setType("unknown");
            contextScope.setId(scope);
        }
        response.setScope(contextScope);

        TimeRange timeRange = new TimeRange();
        timeRange.setStart(timeRangeStart);
        timeRange.setEnd(timeRangeEnd);

        // Optionally validate the date-time format in a lenient way for the stub.
        // Real validation rules should be added later alongside business logic.
        validateOptionalDateTime(timeRangeStart);
        validateOptionalDateTime(timeRangeEnd);

        response.setTimeRange(timeRange);
        response.setFocus(focus);
        response.setRecommendations(Collections.<Recommendation>emptyList());

        return ResponseEntity.ok(response);
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






package com.spaceflow.analytics.api;

import com.spaceflow.analytics.dto.BookingUsageResponse;
import com.spaceflow.analytics.dto.PatternInsightsResponse;
import com.spaceflow.analytics.dto.SegmentComparisonResponse;
import com.spaceflow.analytics.dto.SnapshotResponse;
import com.spaceflow.analytics.dto.UtilizationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AnalyticsController {

    @GetMapping("/utilization")
    public ResponseEntity<UtilizationResponse> getUtilization(
            @RequestParam(name = "scopeType") String scopeType,
            @RequestParam(name = "scopeId", required = false) String scopeId,
            @RequestParam(name = "from") String from,
            @RequestParam(name = "to") String to,
            @RequestParam(name = "granularity", required = false) String granularity,
            @RequestParam(name = "groupBy", required = false) String groupBy
    ) {
        // TODO: Implement retrieval of aggregated utilization metrics
        // This is a read-only, derived view over booking and occupancy data.
        UtilizationResponse response = new UtilizationResponse();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/booking-usage")
    public ResponseEntity<BookingUsageResponse> getBookingUsage(
            @RequestParam(name = "scopeType") String scopeType,
            @RequestParam(name = "scopeId", required = false) String scopeId,
            @RequestParam(name = "from") String from,
            @RequestParam(name = "to") String to,
            @RequestParam(name = "granularity", required = false) String granularity
    ) {
        // TODO: Implement retrieval of aggregated booking vs usage summaries
        // This endpoint must not perform any mutations in upstream services.
        BookingUsageResponse response = new BookingUsageResponse();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/patterns")
    public ResponseEntity<PatternInsightsResponse> getPatterns(
            @RequestParam(name = "scopeType") String scopeType,
            @RequestParam(name = "scopeId", required = false) String scopeId,
            @RequestParam(name = "from", required = false) String from,
            @RequestParam(name = "to", required = false) String to,
            @RequestParam(name = "focus", required = false) String focus
    ) {
        // TODO: Implement retrieval of derived temporal and behavioral pattern insights
        // Insights are heuristic, approximate, and non-authoritative.
        PatternInsightsResponse response = new PatternInsightsResponse();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/segments/comparisons")
    public ResponseEntity<SegmentComparisonResponse> getSegmentComparisons(
            @RequestParam(name = "scopeType") String scopeType,
            @RequestParam(name = "scopeId", required = false) String scopeId,
            @RequestParam(name = "from") String from,
            @RequestParam(name = "to") String to,
            @RequestParam(name = "segmentBy") String segmentBy,
            @RequestParam(name = "metric", required = false) String metric
    ) {
        // TODO: Implement retrieval of segmented or comparative analytics
        // Results should be aggregated and non-authoritative.
        SegmentComparisonResponse response = new SegmentComparisonResponse();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/snapshots")
    public ResponseEntity<SnapshotResponse> getSnapshots(
            @RequestParam(name = "scopeType") String scopeType,
            @RequestParam(name = "scopeId", required = false) String scopeId,
            @RequestParam(name = "asOf", required = false) String asOf,
            @RequestParam(name = "baselineWindow", required = false) String baselineWindow
    ) {
        // TODO: Implement retrieval of snapshot or baseline summaries
        // Snapshots must be treated as approximate and possibly delayed.
        SnapshotResponse response = new SnapshotResponse();
        return ResponseEntity.ok(response);
    }
}



package com.spaceflow.analytics.api;

import com.spaceflow.analytics.dto.BookingUsageBucket;
import com.spaceflow.analytics.dto.BookingUsageResponse;
import com.spaceflow.analytics.dto.PatternInsightsResponse;
import com.spaceflow.analytics.dto.Scope;
import com.spaceflow.analytics.dto.SegmentComparisonResponse;
import com.spaceflow.analytics.dto.SnapshotResponse;
import com.spaceflow.analytics.dto.SnapshotSummary;
import com.spaceflow.analytics.dto.TimeRange;
import com.spaceflow.analytics.dto.UtilizationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Collections;

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
        response.setScope(new Scope());
        TimeRange timeRange = new TimeRange();
        timeRange.setFrom(from);
        timeRange.setTo(to);
        response.setTimeRange(timeRange);
        response.setGranularity(granularity != null ? granularity : "daily");

        // DEV SEED DATA: temporary hardcoded utilization points for development-only charts.
        // This block should only be used while no real analytics pipeline is wired up.
        // It is intentionally simple and easy to remove once real data is available.
        if (true) { // Replace this guard when real utilization data retrieval is implemented.
            com.spaceflow.analytics.dto.UtilizationPoint p1 = new com.spaceflow.analytics.dto.UtilizationPoint();
            p1.setTimestamp("2025-01-13T09:00:00Z");
            p1.setGroupKey(scopeType != null ? scopeType : "workspace");
            p1.setUtilizationPercent(0.42);
            p1.setOccupiedCount(42L);
            p1.setCapacity(100L);
            p1.setSampleSize(84L);
            p1.setPartial(false);

            com.spaceflow.analytics.dto.UtilizationPoint p2 = new com.spaceflow.analytics.dto.UtilizationPoint();
            p2.setTimestamp("2025-01-13T13:00:00Z");
            p2.setGroupKey(scopeType != null ? scopeType : "workspace");
            p2.setUtilizationPercent(0.67);
            p2.setOccupiedCount(67L);
            p2.setCapacity(100L);
            p2.setSampleSize(120L);
            p2.setPartial(false);

            com.spaceflow.analytics.dto.UtilizationPoint p3 = new com.spaceflow.analytics.dto.UtilizationPoint();
            p3.setTimestamp("2025-01-13T17:00:00Z");
            p3.setGroupKey(scopeType != null ? scopeType : "workspace");
            p3.setUtilizationPercent(0.51);
            p3.setOccupiedCount(51L);
            p3.setCapacity(100L);
            p3.setSampleSize(95L);
            p3.setPartial(true); // Last bucket often represents a partial hour/window.

            response.setNotes("DEV SEED DATA – stubbed utilization metrics for development only; not real analytics.");
            response.setPoints(Arrays.asList(p1, p2, p3));
        } else {
            // Fallback stub when/if real data retrieval is introduced but yields no results.
            response.setNotes("Stub response");
            response.setPoints(Collections.emptyList());
        }

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
        response.setScope(new Scope());
        TimeRange timeRange = new TimeRange();
        timeRange.setFrom(from);
        timeRange.setTo(to);
        response.setTimeRange(timeRange);
        response.setGranularity(granularity != null ? granularity : "daily");

        // DEV SEED DATA – stubbed booking vs usage metrics for development only; not real analytics.
        BookingUsageBucket b1 = new BookingUsageBucket();
        b1.setPeriodStart("2025-01-13T09:00:00Z");
        b1.setPeriodEnd("2025-01-13T10:00:00Z");
        b1.setBookedCount(40L);
        b1.setUsedCount(32L);
        b1.setNoShowCount(4L);
        b1.setCancelledCount(4L);

        BookingUsageBucket b2 = new BookingUsageBucket();
        b2.setPeriodStart("2025-01-13T13:00:00Z");
        b2.setPeriodEnd("2025-01-13T14:00:00Z");
        b2.setBookedCount(55L);
        b2.setUsedCount(48L);
        b2.setNoShowCount(5L);
        b2.setCancelledCount(2L);

        BookingUsageBucket b3 = new BookingUsageBucket();
        b3.setPeriodStart("2025-01-13T17:00:00Z");
        b3.setPeriodEnd("2025-01-13T18:00:00Z");
        b3.setBookedCount(30L);
        b3.setUsedCount(20L);
        b3.setNoShowCount(6L);
        b3.setCancelledCount(4L);

        response.setNotes("DEV SEED DATA – stubbed booking vs usage metrics for development only; not real analytics.");
        response.setBuckets(Arrays.asList(b1, b2, b3));

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
        response.setScope(new Scope());
        TimeRange timeRange = new TimeRange();
        timeRange.setFrom(from);
        timeRange.setTo(to);
        response.setTimeRange(timeRange);
        response.setNotes("Stub response");
        response.setInsights(Collections.emptyList());

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
        response.setScope(new Scope());
        TimeRange timeRange = new TimeRange();
        timeRange.setFrom(from);
        timeRange.setTo(to);
        response.setTimeRange(timeRange);
        response.setSegmentBy(segmentBy);
        response.setNotes("Stub response");
        response.setSegments(Collections.emptyList());

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
        response.setScope(new Scope());

        SnapshotSummary summary = new SnapshotSummary();
        summary.setAsOf(asOf);
        summary.setBaselineWindow(baselineWindow);
        summary.setNotes("Stub response");
        summary.setMetrics(Collections.emptyList());

        response.setSummary(summary);

        return ResponseEntity.ok(response);
    }
}



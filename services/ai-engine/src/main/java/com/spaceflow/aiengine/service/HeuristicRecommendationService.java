package com.spaceflow.aiengine.service;

import com.spaceflow.aiengine.dto.ContextScope;
import com.spaceflow.aiengine.dto.Recommendation;
import com.spaceflow.aiengine.dto.RecommendationExplanation;
import com.spaceflow.aiengine.dto.RecommendationsResponse;
import com.spaceflow.aiengine.dto.TimeRange;
import com.spaceflow.aiengine.service.analytics.BookingUsageBucket;
import com.spaceflow.aiengine.service.analytics.BookingUsageResponse;
import com.spaceflow.aiengine.service.analytics.UtilizationPoint;
import com.spaceflow.aiengine.service.analytics.UtilizationResponse;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Deterministic, heuristic-based recommendation generator.
 *
 * All logic here is:
 * - Advisory and non-authoritative
 * - Purely read-only
 * - Derived from Analytics Service outputs
 *
 * TODO: In the future, replace parts of this heuristic layer with ML/LLM models
 *       while keeping the inputs/outputs explainable and auditable.
 */
@Service
public class HeuristicRecommendationService {

    private final AnalyticsClient analyticsClient;

    public HeuristicRecommendationService(AnalyticsClient analyticsClient) {
        this.analyticsClient = analyticsClient;
    }

    public RecommendationsResponse generateRecommendations(ContextScope scope,
                                                           TimeRange timeRange,
                                                           String focus,
                                                           Integer limit) {
        RecommendationsResponse response = new RecommendationsResponse();
        response.setScope(scope);
        response.setTimeRange(timeRange);
        response.setFocus(focus);

        String scopeType = scope.getType();
        String scopeId = scope.getId();

        String from = timeRange.getStart();
        String to = timeRange.getEnd();

        // Use daily granularity for heuristics by default.
        String granularity = "daily";

        UtilizationResponse utilization = analyticsClient.getUtilization(
                scopeType, scopeId, from, to, granularity
        );
        BookingUsageResponse bookingUsage = analyticsClient.getBookingUsage(
                scopeType, scopeId, from, to, granularity
        );

        List<Recommendation> all = new ArrayList<>();

        all.addAll(generateUnderutilizedSpaces(scope, timeRange, utilization));
        all.addAll(generateBookingVsUsageMismatch(scope, timeRange, utilization, bookingUsage));
        all.addAll(generatePeakCongestion(scope, timeRange, utilization));
        all.addAll(generateHighNoShowPatterns(scope, timeRange, bookingUsage));

        // Deterministic ordering: sort by confidence desc, then title asc, then id asc.
        all.sort(Comparator
                .comparing(Recommendation::getConfidence, Comparator.nullsLast(Comparator.reverseOrder()))
                .thenComparing(Recommendation::getTitle, Comparator.nullsLast(String::compareTo))
                .thenComparing(Recommendation::getId, Comparator.nullsLast(String::compareTo))
        );

        if (limit != null && limit > 0 && all.size() > limit) {
            all = new ArrayList<>(all.subList(0, limit));
        }

        response.setRecommendations(all);
        return response;
    }

    public RecommendationExplanation explain(String recommendationId,
                                             String scope) {
        RecommendationExplanation explanation = new RecommendationExplanation();
        explanation.setRecommendationId(recommendationId);

        // Recommendation IDs are prefixed by category for simple reverse lookup.
        if (recommendationId.startsWith("underutilized-")) {
            explanation.setSummary("Space appears to be consistently underutilized.");
            explanation.setDetailedExplanation("Based on utilization analytics, this space rarely exceeds a moderate occupancy threshold. " +
                    "This suggests an opportunity to consolidate, repurpose, or promote it.");
            explanation.setContributingSignals(List.of(
                    contributing("Low average utilization", "Most observed periods are well below 40% occupancy."),
                    contributing("Few peak events", "Very few time buckets cross 60% utilization.")
            ));
            explanation.setConfidenceBreakdown(confidence(0.7,
                    "Heuristic based on aggregate utilization. Confidence would increase with longer history and segment-level analysis."));
            explanation.setCaveats(List.of(
                    "Short-term anomalies (e.g., seasonal effects) are not explicitly modeled.",
                    "This does not account for qualitative factors like strategic importance of the space.",
                    "Analytics data may be incomplete or delayed."
            ));
        } else if (recommendationId.startsWith("booking-mismatch-")) {
            explanation.setSummary("Bookings and actual usage are misaligned.");
            explanation.setDetailedExplanation("Comparison of booking counts with measured usage indicates either frequent no-shows or " +
                    "consistent over-usage relative to bookings. This can lead to perceived unfairness and planning issues.");
            explanation.setContributingSignals(List.of(
                    contributing("High no-show share", "A significant portion of booked slots are not actually used."),
                    contributing("Usage pattern drift", "Usage levels differ meaningfully from booking levels across the window.")
            ));
            explanation.setConfidenceBreakdown(confidence(0.75,
                    "Heuristic ratio thresholds on bookings vs usage. Confidence would increase with richer behavioral features."));
            explanation.setCaveats(List.of(
                    "Does not distinguish between intentional overbooking and accidental no-shows.",
                    "Special events may temporarily skew booking behavior.",
                    "Relies on accurate mapping between bookings and occupancy signals."
            ));
        } else if (recommendationId.startsWith("peak-congestion-")) {
            explanation.setSummary("There are recurring peak congestion periods.");
            explanation.setDetailedExplanation("Utilization metrics show repeated high-occupancy time windows that approach or exceed " +
                    "a congestion threshold. This can cause crowding and reduced experience quality.");
            explanation.setContributingSignals(List.of(
                    contributing("Repeated high-utilization buckets", "Multiple time buckets exceed 80% occupancy."),
                    contributing("Clustered in similar time-of-day", "Peaks tend to occur at similar hours across days.")
            ));
            explanation.setConfidenceBreakdown(confidence(0.8,
                    "Heuristic on high-percentile utilization across time-of-day. ML could later refine by clustering and user impact signals."));
            explanation.setCaveats(List.of(
                    "Does not account for space type-specific tolerance to high density.",
                    "Short observation windows can falsely suggest patterns.",
                    "No adjustment is made for planned special events."
            ));
        } else if (recommendationId.startsWith("no-show-pattern-")) {
            explanation.setSummary("High or recurring no-show patterns detected.");
            explanation.setDetailedExplanation("Aggregated booking vs usage data indicates a consistently elevated no-show rate " +
                    "during the analyzed period. This suggests an opportunity to tighten booking policies or send reminders.");
            explanation.setContributingSignals(List.of(
                    contributing("Elevated no-show share", "No-shows exceed a configured percentage of total bookings."),
                    contributing("Persistence over time", "High no-show rates appear in multiple buckets, not just a single spike.")
            ));
            explanation.setConfidenceBreakdown(confidence(0.78,
                    "Heuristic thresholding on no-show ratios. ML could later incorporate user-level history and seasonality."));
            explanation.setCaveats(List.of(
                    "Does not distinguish between benign late cancellations and true no-shows.",
                    "External factors (e.g., transport disruptions) are not modeled.",
                    "Relies on the correctness and completeness of booking/usage matching."
            ));
        } else {
            explanation.setSummary("Unknown recommendation.");
            explanation.setDetailedExplanation("The AI Engine could not infer a heuristic explanation for this recommendation id. " +
                    "It may have been generated by a newer version or a different strategy.");
            explanation.setContributingSignals(List.of());
            explanation.setConfidenceBreakdown(confidence(0.1,
                    "This explanation was generated without matching a known heuristic rule set."));
            explanation.setCaveats(List.of(
                    "Review the originating system or version for more details.",
                    "Ensure recommendation identifiers follow the expected naming convention."
            ));
        }

        return explanation;
    }

    private List<Recommendation> generateUnderutilizedSpaces(ContextScope scope,
                                                             TimeRange timeRange,
                                                             UtilizationResponse utilization) {
        List<Recommendation> result = new ArrayList<>();

        if (utilization == null || utilization.getPoints() == null || utilization.getPoints().isEmpty()) {
            return result;
        }

        double avgUtilization = utilization.getPoints().stream()
                .map(UtilizationPoint::getUtilizationPercent)
                .filter(p -> p != null)
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0.0);

        long lowUtilBuckets = utilization.getPoints().stream()
                .map(UtilizationPoint::getUtilizationPercent)
                .filter(p -> p != null && p < 0.4)
                .count();

        double lowBucketShare = (double) lowUtilBuckets / utilization.getPoints().size();

        if (avgUtilization < 0.5 && lowBucketShare >= 0.5) {
            Recommendation rec = baseRecommendation(
                    "underutilized",
                    scope,
                    "Underutilized space",
                    "This space is underutilized across the selected period. " +
                            "Consider consolidating, repurposing, or promoting it."
            );

            rec.setConfidence(clamp((0.5 - avgUtilization) + (lowBucketShare - 0.5)));
            rec.setPrimaryReasons(List.of(
                    String.format("Average utilization is %.0f%%, below the 50%% heuristic threshold.", avgUtilization * 100),
                    String.format("%.0f%% of observed periods are below 40%% utilization.", lowBucketShare * 100)
            ));

            result.add(rec);
        }

        return result;
    }

    private List<Recommendation> generateBookingVsUsageMismatch(ContextScope scope,
                                                                TimeRange timeRange,
                                                                UtilizationResponse utilization,
                                                                BookingUsageResponse bookingUsage) {
        List<Recommendation> result = new ArrayList<>();

        if (bookingUsage == null || bookingUsage.getBuckets() == null || bookingUsage.getBuckets().isEmpty()) {
            return result;
        }

        long totalBooked = bookingUsage.getBuckets().stream()
                .map(BookingUsageBucket::getBookedCount)
                .filter(v -> v != null)
                .mapToLong(Long::longValue)
                .sum();

        long totalUsed = bookingUsage.getBuckets().stream()
                .map(BookingUsageBucket::getUsedCount)
                .filter(v -> v != null)
                .mapToLong(Long::longValue)
                .sum();

        if (totalBooked == 0) {
            return result;
        }

        double usageToBookingRatio = (double) totalUsed / (double) totalBooked;

        boolean strongUnderuse = usageToBookingRatio < 0.75;
        boolean strongOveruse = usageToBookingRatio > 1.1;

        if (!strongUnderuse && !strongOveruse) {
            return result;
        }

        String pattern;
        String description;
        if (strongUnderuse) {
            pattern = "underuse";
            description = "Bookings significantly exceed actual usage. " +
                    "This suggests frequent no-shows or overly conservative booking behavior.";
        } else {
            pattern = "overuse";
            description = "Actual usage consistently exceeds bookings. " +
                    "This suggests that people use the space without formal bookings or that capacity assumptions are too low.";
        }

        Recommendation rec = baseRecommendation(
                "booking-mismatch",
                scope,
                "Booking vs usage mismatch (" + pattern + ")",
                description
        );

        double deviation = strongUnderuse
                ? (0.75 - usageToBookingRatio)
                : (usageToBookingRatio - 1.1);
        rec.setConfidence(clamp(0.5 + deviation));

        rec.setPrimaryReasons(List.of(
                String.format("Total bookings: %d, total used: %d.", totalBooked, totalUsed),
                String.format("Usage-to-booking ratio is %.0f%%.", usageToBookingRatio * 100)
        ));

        result.add(rec);
        return result;
    }

    private List<Recommendation> generatePeakCongestion(ContextScope scope,
                                                        TimeRange timeRange,
                                                        UtilizationResponse utilization) {
        List<Recommendation> result = new ArrayList<>();

        if (utilization == null || utilization.getPoints() == null || utilization.getPoints().isEmpty()) {
            return result;
        }

        List<UtilizationPoint> highBuckets = utilization.getPoints().stream()
                .filter(p -> p.getUtilizationPercent() != null && p.getUtilizationPercent() >= 0.8)
                .collect(Collectors.toList());

        if (highBuckets.size() < 2) {
            return result;
        }

        double maxUtil = highBuckets.stream()
                .map(UtilizationPoint::getUtilizationPercent)
                .filter(v -> v != null)
                .mapToDouble(Double::doubleValue)
                .max()
                .orElse(0.0);

        Recommendation rec = baseRecommendation(
                "peak-congestion",
                scope,
                "Peak congestion periods",
                "There are recurring periods where utilization is very high, which may cause congestion and a poor user experience."
        );

        double share = (double) highBuckets.size() / (double) utilization.getPoints().size();
        rec.setConfidence(clamp(0.6 + share + (maxUtil - 0.8)));

        List<String> reasons = new ArrayList<>();
        reasons.add(String.format("%d time buckets exceed 80%% utilization.", highBuckets.size()));
        reasons.add(String.format("Maximum observed utilization is %.0f%%.", maxUtil * 100));

        String hourSummary = summarizeHours(highBuckets);
        if (!hourSummary.isEmpty()) {
            reasons.add("Peaks cluster around: " + hourSummary + ".");
        }

        rec.setPrimaryReasons(reasons);
        result.add(rec);
        return result;
    }

    private List<Recommendation> generateHighNoShowPatterns(ContextScope scope,
                                                            TimeRange timeRange,
                                                            BookingUsageResponse bookingUsage) {
        List<Recommendation> result = new ArrayList<>();

        if (bookingUsage == null || bookingUsage.getBuckets() == null || bookingUsage.getBuckets().isEmpty()) {
            return result;
        }

        long totalBooked = 0;
        long totalNoShow = 0;
        int elevatedBuckets = 0;

        for (BookingUsageBucket bucket : bookingUsage.getBuckets()) {
            Long booked = bucket.getBookedCount();
            Long noShow = bucket.getNoShowCount();
            if (booked == null || booked == 0L || noShow == null) {
                continue;
            }
            totalBooked += booked;
            totalNoShow += noShow;

            double bucketRatio = (double) noShow / (double) booked;
            if (bucketRatio >= 0.2) {
                elevatedBuckets++;
            }
        }

        if (totalBooked == 0 || totalNoShow == 0) {
            return result;
        }

        double globalNoShowRatio = (double) totalNoShow / (double) totalBooked;

        if (globalNoShowRatio < 0.15) {
            return result;
        }

        Recommendation rec = baseRecommendation(
                "no-show-pattern",
                scope,
                "High no-show rates",
                "No-shows are elevated across the analyzed period. Consider nudges, reminders, or stricter booking policies."
        );

        double elevatedShare = (double) elevatedBuckets / (double) bookingUsage.getBuckets().size();
        rec.setConfidence(clamp(0.6 + (globalNoShowRatio - 0.15) + elevatedShare));

        rec.setPrimaryReasons(List.of(
                String.format("Overall no-show rate is %.0f%%.", globalNoShowRatio * 100),
                String.format("%d buckets have no-show rates above 20%%.", elevatedBuckets)
        ));

        result.add(rec);
        return result;
    }

    private Recommendation baseRecommendation(String prefix,
                                              ContextScope scope,
                                              String title,
                                              String description) {
        Recommendation rec = new Recommendation();
        rec.setId(prefix + "-" + UUID.randomUUID());
        rec.setCategory(prefix);
        rec.setTitle(title);
        rec.setDescription(description);
        rec.setImpactLevel("medium");
        rec.setCreatedAt(nowIso());
        return rec;
    }

    private RecommendationExplanation.ContributingSignal contributing(String label, String influence) {
        RecommendationExplanation.ContributingSignal signal = new RecommendationExplanation.ContributingSignal();
        signal.setLabel(label);
        signal.setInfluence(influence);
        return signal;
    }

    private RecommendationExplanation.ConfidenceBreakdown confidence(Double overall, String notes) {
        RecommendationExplanation.ConfidenceBreakdown breakdown = new RecommendationExplanation.ConfidenceBreakdown();
        breakdown.setOverall(overall);
        breakdown.setNotes(notes);
        return breakdown;
    }

    private String nowIso() {
        return OffsetDateTime.now().toString();
    }

    private double clamp(double value) {
        if (value < 0.0) {
            return 0.0;
        }
        if (value > 1.0) {
            return 1.0;
        }
        return value;
    }

    private String summarizeHours(List<UtilizationPoint> points) {
        List<String> hours = new ArrayList<>();
        for (UtilizationPoint p : points) {
            if (p.getTimestamp() == null) {
                continue;
            }
            try {
                OffsetDateTime ts = OffsetDateTime.parse(p.getTimestamp());
                int hour = ts.getHour();
                String label = String.format("%02d:00", hour);
                if (!hours.contains(label)) {
                    hours.add(label);
                }
            } catch (DateTimeParseException ignored) {
                // If the timestamp cannot be parsed we simply skip it for clustering.
            }
        }
        return String.join(", ", hours);
    }
}



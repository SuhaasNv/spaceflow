package com.spaceflow.aiengine.service.analytics;

import java.util.List;

/**
 * Local mirror of Analytics Service PatternInsightsResponse.
 *
 * Currently unused by the heuristic layer but kept for completeness and future extension.
 */
public class PatternInsightsResponse {

    private Scope scope;
    private TimeRange timeRange;
    private String notes;
    private List<PatternInsight> insights;

    public Scope getScope() {
        return scope;
    }

    public void setScope(Scope scope) {
        this.scope = scope;
    }

    public TimeRange getTimeRange() {
        return timeRange;
    }

    public void setTimeRange(TimeRange timeRange) {
        this.timeRange = timeRange;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<PatternInsight> getInsights() {
        return insights;
    }

    public void setInsights(List<PatternInsight> insights) {
        this.insights = insights;
    }
}





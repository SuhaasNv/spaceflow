package com.spaceflow.aiengine.dto;

import java.util.List;

/**
 * Response wrapper for advisory recommendations list.
 */
public class RecommendationsResponse {

    private ContextScope scope;
    private TimeRange timeRange;
    private String focus;
    private List<Recommendation> recommendations;

    public RecommendationsResponse() {
    }

    public ContextScope getScope() {
        return scope;
    }

    public void setScope(ContextScope scope) {
        this.scope = scope;
    }

    public TimeRange getTimeRange() {
        return timeRange;
    }

    public void setTimeRange(TimeRange timeRange) {
        this.timeRange = timeRange;
    }

    public String getFocus() {
        return focus;
    }

    public void setFocus(String focus) {
        this.focus = focus;
    }

    public List<Recommendation> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<Recommendation> recommendations) {
        this.recommendations = recommendations;
    }
}







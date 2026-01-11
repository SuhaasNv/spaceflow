package com.spaceflow.aiengine.service.analytics;

import java.util.List;

/**
 * Local mirror of Analytics Service UtilizationResponse.
 */
public class UtilizationResponse {

    private Scope scope;
    private TimeRange timeRange;
    private String granularity;
    private String notes;
    private List<UtilizationPoint> points;

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

    public String getGranularity() {
        return granularity;
    }

    public void setGranularity(String granularity) {
        this.granularity = granularity;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<UtilizationPoint> getPoints() {
        return points;
    }

    public void setPoints(List<UtilizationPoint> points) {
        this.points = points;
    }
}










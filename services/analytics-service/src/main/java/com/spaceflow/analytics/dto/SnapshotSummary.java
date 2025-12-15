package com.spaceflow.analytics.dto;

import java.util.List;

public class SnapshotSummary {

    private String asOf;
    private String baselineWindow;
    private String notes;
    private List<SnapshotMetric> metrics;

    public String getAsOf() {
        return asOf;
    }

    public void setAsOf(String asOf) {
        this.asOf = asOf;
    }

    public String getBaselineWindow() {
        return baselineWindow;
    }

    public void setBaselineWindow(String baselineWindow) {
        this.baselineWindow = baselineWindow;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<SnapshotMetric> getMetrics() {
        return metrics;
    }

    public void setMetrics(List<SnapshotMetric> metrics) {
        this.metrics = metrics;
    }
}



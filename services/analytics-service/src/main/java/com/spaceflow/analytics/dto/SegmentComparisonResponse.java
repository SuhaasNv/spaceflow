package com.spaceflow.analytics.dto;

import java.util.List;

public class SegmentComparisonResponse {

    private Scope scope;
    private TimeRange timeRange;
    private String segmentBy;
    private String notes;
    private List<SegmentResult> segments;

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

    public String getSegmentBy() {
        return segmentBy;
    }

    public void setSegmentBy(String segmentBy) {
        this.segmentBy = segmentBy;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<SegmentResult> getSegments() {
        return segments;
    }

    public void setSegments(List<SegmentResult> segments) {
        this.segments = segments;
    }
}



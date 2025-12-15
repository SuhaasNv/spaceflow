package com.spaceflow.analytics.dto;

import java.util.List;

public class BookingUsageResponse {

    private Scope scope;
    private TimeRange timeRange;
    private String granularity;
    private String notes;
    private List<BookingUsageBucket> buckets;

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

    public List<BookingUsageBucket> getBuckets() {
        return buckets;
    }

    public void setBuckets(List<BookingUsageBucket> buckets) {
        this.buckets = buckets;
    }
}



package com.spaceflow.analytics.dto;

import java.util.List;

public class SegmentResult {

    private String segmentKey;
    private String segmentLabel;
    private List<SegmentMetric> metrics;

    public String getSegmentKey() {
        return segmentKey;
    }

    public void setSegmentKey(String segmentKey) {
        this.segmentKey = segmentKey;
    }

    public String getSegmentLabel() {
        return segmentLabel;
    }

    public void setSegmentLabel(String segmentLabel) {
        this.segmentLabel = segmentLabel;
    }

    public List<SegmentMetric> getMetrics() {
        return metrics;
    }

    public void setMetrics(List<SegmentMetric> metrics) {
        this.metrics = metrics;
    }
}



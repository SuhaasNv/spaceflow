package com.spaceflow.aiengine.dto;

/**
 * Time window used when deriving insights and recommendations.
 */
public class TimeRange {

    private String start;
    private String end;

    public TimeRange() {
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }
}





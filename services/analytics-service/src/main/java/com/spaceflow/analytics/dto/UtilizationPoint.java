package com.spaceflow.analytics.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * DTO matching the UtilizationPoint schema from the Analytics Service OpenAPI contract.
 */
public class UtilizationPoint {

    private String timestamp;
    private String groupKey;
    private Double utilizationPercent;
    private Long occupiedCount;
    private Long capacity;
    private Long sampleSize;

    /**
     * Backing field for the OpenAPI property named "isPartial".
     * The internal name avoids the "is" prefix to keep JavaBean conventions clear,
     * while the JSON property name is forced to "isPartial".
     */
    @JsonProperty("isPartial")
    private Boolean partial;

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getGroupKey() {
        return groupKey;
    }

    public void setGroupKey(String groupKey) {
        this.groupKey = groupKey;
    }

    public Double getUtilizationPercent() {
        return utilizationPercent;
    }

    public void setUtilizationPercent(Double utilizationPercent) {
        this.utilizationPercent = utilizationPercent;
    }

    public Long getOccupiedCount() {
        return occupiedCount;
    }

    public void setOccupiedCount(Long occupiedCount) {
        this.occupiedCount = occupiedCount;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Long getSampleSize() {
        return sampleSize;
    }

    public void setSampleSize(Long sampleSize) {
        this.sampleSize = sampleSize;
    }

    public Boolean isPartial() {
        return partial;
    }

    public void setPartial(Boolean partial) {
        this.partial = partial;
    }
}



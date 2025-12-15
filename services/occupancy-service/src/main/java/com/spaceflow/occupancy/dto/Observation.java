package com.spaceflow.occupancy.dto;

import java.time.OffsetDateTime;

public class Observation {

    private String observationId;
    private String spaceId;
    private OffsetDateTime observedStartTime;
    private OffsetDateTime observedEndTime;
    private String occupancyStatus;
    private String notes;
    private OffsetDateTime recordedAt;
    private OffsetDateTime updatedAt;

    public String getObservationId() {
        return observationId;
    }

    public void setObservationId(String observationId) {
        this.observationId = observationId;
    }

    public String getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(String spaceId) {
        this.spaceId = spaceId;
    }

    public OffsetDateTime getObservedStartTime() {
        return observedStartTime;
    }

    public void setObservedStartTime(OffsetDateTime observedStartTime) {
        this.observedStartTime = observedStartTime;
    }

    public OffsetDateTime getObservedEndTime() {
        return observedEndTime;
    }

    public void setObservedEndTime(OffsetDateTime observedEndTime) {
        this.observedEndTime = observedEndTime;
    }

    public String getOccupancyStatus() {
        return occupancyStatus;
    }

    public void setOccupancyStatus(String occupancyStatus) {
        this.occupancyStatus = occupancyStatus;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public OffsetDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(OffsetDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}



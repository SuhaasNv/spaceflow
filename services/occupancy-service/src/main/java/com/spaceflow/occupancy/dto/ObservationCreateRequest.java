package com.spaceflow.occupancy.dto;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public class ObservationCreateRequest {

    @NotNull
    private String spaceId;

    @NotNull
    private OffsetDateTime observedStartTime;

    @NotNull
    private OffsetDateTime observedEndTime;

    @NotNull
    private String occupancyStatus;

    private String notes;

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
}



package com.spaceflow.occupancy.dto;

import java.time.OffsetDateTime;

public class ObservationUpdateRequest {

    private OffsetDateTime observedStartTime;
    private OffsetDateTime observedEndTime;
    private String occupancyStatus;
    private String notes;

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



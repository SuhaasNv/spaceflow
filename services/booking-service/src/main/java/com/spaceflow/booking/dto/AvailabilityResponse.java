package com.spaceflow.booking.dto;

import java.time.OffsetDateTime;
import java.util.List;

public class AvailabilityResponse {
    private Boolean available;
    private String spaceId;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;
    private List<ConflictingBooking> conflictingBookings;

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(String spaceId) {
        this.spaceId = spaceId;
    }

    public OffsetDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(OffsetDateTime startTime) {
        this.startTime = startTime;
    }

    public OffsetDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(OffsetDateTime endTime) {
        this.endTime = endTime;
    }

    public List<ConflictingBooking> getConflictingBookings() {
        return conflictingBookings;
    }

    public void setConflictingBookings(List<ConflictingBooking> conflictingBookings) {
        this.conflictingBookings = conflictingBookings;
    }

    public static class ConflictingBooking {
        private String bookingId;
        private OffsetDateTime startTime;
        private OffsetDateTime endTime;

        public String getBookingId() {
            return bookingId;
        }

        public void setBookingId(String bookingId) {
            this.bookingId = bookingId;
        }

        public OffsetDateTime getStartTime() {
            return startTime;
        }

        public void setStartTime(OffsetDateTime startTime) {
            this.startTime = startTime;
        }

        public OffsetDateTime getEndTime() {
            return endTime;
        }

        public void setEndTime(OffsetDateTime endTime) {
            this.endTime = endTime;
        }
    }
}



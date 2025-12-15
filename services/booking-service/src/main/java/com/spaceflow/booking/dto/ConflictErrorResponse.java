package com.spaceflow.booking.dto;

import java.util.List;

public class ConflictErrorResponse extends ErrorResponse {
    private List<ConflictingBooking> conflictingBookings;

    public ConflictErrorResponse() {
    }

    public ConflictErrorResponse(String error, String message) {
        super(error, message);
    }

    public List<ConflictingBooking> getConflictingBookings() {
        return conflictingBookings;
    }

    public void setConflictingBookings(List<ConflictingBooking> conflictingBookings) {
        this.conflictingBookings = conflictingBookings;
    }

    public static class ConflictingBooking {
        private String bookingId;
        private java.time.OffsetDateTime startTime;
        private java.time.OffsetDateTime endTime;

        public String getBookingId() {
            return bookingId;
        }

        public void setBookingId(String bookingId) {
            this.bookingId = bookingId;
        }

        public java.time.OffsetDateTime getStartTime() {
            return startTime;
        }

        public void setStartTime(java.time.OffsetDateTime startTime) {
            this.startTime = startTime;
        }

        public java.time.OffsetDateTime getEndTime() {
            return endTime;
        }

        public void setEndTime(java.time.OffsetDateTime endTime) {
            this.endTime = endTime;
        }
    }
}






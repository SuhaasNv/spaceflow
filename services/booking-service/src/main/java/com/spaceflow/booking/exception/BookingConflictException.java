package com.spaceflow.booking.exception;

import com.spaceflow.booking.dto.ConflictErrorResponse;
import java.util.List;

public class BookingConflictException extends RuntimeException {
    private List<ConflictErrorResponse.ConflictingBooking> conflictingBookings;

    public BookingConflictException(String message) {
        super(message);
    }

    public BookingConflictException(String message, List<ConflictErrorResponse.ConflictingBooking> conflictingBookings) {
        super(message);
        this.conflictingBookings = conflictingBookings;
    }

    public List<ConflictErrorResponse.ConflictingBooking> getConflictingBookings() {
        return conflictingBookings;
    }
}






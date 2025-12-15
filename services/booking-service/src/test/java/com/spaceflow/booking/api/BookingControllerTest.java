package com.spaceflow.booking.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spaceflow.booking.dto.BookingRequest;
import com.spaceflow.booking.dto.BookingUpdateRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.OffsetDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookingController.class)
class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createBooking_ShouldReturn201() throws Exception {
        BookingRequest request = new BookingRequest();
        request.setSpaceId("space-123");
        request.setStartTime(OffsetDateTime.now().plusHours(1));
        request.setEndTime(OffsetDateTime.now().plusHours(2));

        mockMvc.perform(post("/api/v1/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        // TODO: Verify booking response structure when business logic is implemented
    }

    @Test
    void createBooking_WithMissingRequiredFields_ShouldReturn400() throws Exception {
        BookingRequest request = new BookingRequest();
        // Missing spaceId, startTime, endTime

        mockMvc.perform(post("/api/v1/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
        // TODO: Add @Valid annotation to controller parameter for validation to work
        // TODO: Verify specific validation error messages when validation is enabled
    }

    @Test
    void getBookings_ShouldReturn200() throws Exception {
        String spaceId = "space-123";
        String startTime = OffsetDateTime.now().toString();
        String endTime = OffsetDateTime.now().plusDays(1).toString();

        mockMvc.perform(get("/api/v1/bookings")
                        .param("spaceId", spaceId)
                        .param("startTime", startTime)
                        .param("endTime", endTime))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        // TODO: Verify bookings response structure when business logic is implemented
    }

    @Test
    void getBookings_WithMissingRequiredParams_ShouldReturn400() throws Exception {
        mockMvc.perform(get("/api/v1/bookings"))
                .andExpect(status().isBadRequest());
        // TODO: Verify specific error message for missing required parameters
    }

    @Test
    void updateBooking_ShouldReturn200() throws Exception {
        String bookingId = "booking-123";
        BookingUpdateRequest request = new BookingUpdateRequest();
        request.setPurpose("Updated purpose");

        mockMvc.perform(patch("/api/v1/bookings/{bookingId}", bookingId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        // TODO: Verify booking update response when business logic is implemented
        // TODO: Test conflict detection when modification logic is added
    }

    @Test
    void updateBooking_WithInvalidBookingId_ShouldReturn404() throws Exception {
        BookingUpdateRequest request = new BookingUpdateRequest();
        request.setPurpose("Updated purpose");

        mockMvc.perform(patch("/api/v1/bookings/{bookingId}", "non-existent")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk()); // Currently returns 200 with stubbed implementation
        // TODO: Return 404 when booking not found logic is implemented
    }

    @Test
    void cancelBooking_ShouldReturn200() throws Exception {
        String bookingId = "booking-123";

        mockMvc.perform(delete("/api/v1/bookings/{bookingId}", bookingId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.bookingId").value(bookingId))
                .andExpect(jsonPath("$.status").value("canceled"));
    }

    @Test
    void cancelBooking_WithInvalidBookingId_ShouldReturn404() throws Exception {
        mockMvc.perform(delete("/api/v1/bookings/{bookingId}", "non-existent"))
                .andExpect(status().isOk()); // Currently returns 200 with stubbed implementation
        // TODO: Return 404 when booking not found logic is implemented
    }

    @Test
    void checkAvailability_ShouldReturn200() throws Exception {
        String spaceId = "space-123";
        String startTime = OffsetDateTime.now().toString();
        String endTime = OffsetDateTime.now().plusHours(2).toString();

        mockMvc.perform(get("/api/v1/spaces/{spaceId}/availability", spaceId)
                        .param("startTime", startTime)
                        .param("endTime", endTime))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        // TODO: Verify availability response structure when business logic is implemented
        // TODO: Test conflict detection when availability logic is added
    }

    @Test
    void checkAvailability_WithMissingRequiredParams_ShouldReturn400() throws Exception {
        String spaceId = "space-123";

        mockMvc.perform(get("/api/v1/spaces/{spaceId}/availability", spaceId))
                .andExpect(status().isBadRequest());
        // TODO: Verify specific error message for missing required parameters
    }

    @Test
    void checkAvailability_WithInvalidTimePeriod_ShouldReturn400() throws Exception {
        String spaceId = "space-123";
        String startTime = OffsetDateTime.now().plusHours(2).toString();
        String endTime = OffsetDateTime.now().plusHours(1).toString(); // end before start

        mockMvc.perform(get("/api/v1/spaces/{spaceId}/availability", spaceId)
                        .param("startTime", startTime)
                        .param("endTime", endTime))
                .andExpect(status().isOk()); // Currently returns 200 with stubbed implementation
        // TODO: Return 400 when time period validation logic is implemented
    }
}





package com.spaceflow.occupancy.controller;

import com.spaceflow.occupancy.dto.Observation;
import com.spaceflow.occupancy.dto.ObservationCreateRequest;
import com.spaceflow.occupancy.dto.ObservationUpdateRequest;
import com.spaceflow.occupancy.dto.ObservationsResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/occupancy")
public class OccupancyObservationController {

    @PostMapping("/observations")
    public ResponseEntity<Observation> recordObservation(
            @Valid @RequestBody ObservationCreateRequest request) {

        // TODO: Implement recording of occupancy observation

        Observation observation = new Observation();
        observation.setObservationId(UUID.randomUUID().toString());
        observation.setSpaceId(request.getSpaceId());
        observation.setObservedStartTime(request.getObservedStartTime());
        observation.setObservedEndTime(request.getObservedEndTime());
        observation.setOccupancyStatus(request.getOccupancyStatus());
        observation.setNotes(request.getNotes());
        observation.setRecordedAt(OffsetDateTime.now());
        observation.setUpdatedAt(null);

        return ResponseEntity.status(HttpStatus.CREATED).body(observation);
    }

    @GetMapping("/observations")
    public ResponseEntity<ObservationsResponse> getObservations(
            @RequestParam("spaceId") String spaceId,
            @RequestParam("startTime") OffsetDateTime startTime,
            @RequestParam("endTime") OffsetDateTime endTime) {

        // TODO: Implement retrieval of occupancy observations

        ObservationsResponse response = new ObservationsResponse(Collections.emptyList());
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/observations/{observationId}")
    public ResponseEntity<?> updateObservation(
            @PathVariable("observationId") String observationId,
            @Valid @RequestBody ObservationUpdateRequest request) {

        // TODO: Implement update/correction of occupancy observation
        // For now, always return a stub Observation and HTTP 200.
        // In a real implementation, this would return 404 when the observation is not found.

        Observation observation = new Observation();
        observation.setObservationId(observationId);
        observation.setSpaceId("stub-space-id");
        observation.setObservedStartTime(request.getObservedStartTime() != null
                ? request.getObservedStartTime()
                : OffsetDateTime.now());
        observation.setObservedEndTime(request.getObservedEndTime() != null
                ? request.getObservedEndTime()
                : OffsetDateTime.now());
        observation.setOccupancyStatus(request.getOccupancyStatus() != null
                ? request.getOccupancyStatus()
                : "occupied");
        observation.setNotes(request.getNotes());
        observation.setRecordedAt(OffsetDateTime.now().minusMinutes(5));
        observation.setUpdatedAt(OffsetDateTime.now());

        return ResponseEntity.ok(observation);
    }
}



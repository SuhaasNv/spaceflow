package com.spaceflow.occupancy.api;

import com.spaceflow.occupancy.dto.Observation;
import com.spaceflow.occupancy.dto.ObservationCreateRequest;
import com.spaceflow.occupancy.dto.ObservationUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class OccupancyObservationController {

    @PostMapping("/occupancy/observations")
    public ResponseEntity<Observation> recordObservation(
            @RequestBody ObservationCreateRequest request) {
        // TODO: Implement recording of occupancy observation
        // TODO: Accept delayed, incomplete, or inconsistent observations

        Observation observation = new Observation();
        return ResponseEntity.status(HttpStatus.CREATED).body(observation);
    }

    @GetMapping("/occupancy/observations")
    public ResponseEntity<ObservationsResponse> getObservations(
            @RequestParam String spaceId,
            @RequestParam String startTime,
            @RequestParam String endTime) {
        // TODO: Implement retrieval of observations for the given space and time window
        // TODO: Support delayed, incomplete, and overlapping observations

        ObservationsResponse response = new ObservationsResponse();
        response.setObservations(Collections.emptyList());
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/occupancy/observations/{observationId}")
    public ResponseEntity<Observation> updateObservation(
            @PathVariable String observationId,
            @RequestBody ObservationUpdateRequest request) {
        // TODO: Implement updating or correcting an existing observation
        // TODO: Allow overlapping and coexisting observations

        Observation observation = new Observation();
        return ResponseEntity.ok(observation);
    }

    public static class ObservationsResponse {
        private List<Observation> observations;

        public List<Observation> getObservations() {
            return observations;
        }

        public void setObservations(List<Observation> observations) {
            this.observations = observations;
        }
    }
}



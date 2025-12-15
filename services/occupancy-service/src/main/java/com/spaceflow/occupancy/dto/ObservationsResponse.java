package com.spaceflow.occupancy.dto;

import java.util.List;

public class ObservationsResponse {

    private List<Observation> observations;

    public ObservationsResponse() {
    }

    public ObservationsResponse(List<Observation> observations) {
        this.observations = observations;
    }

    public List<Observation> getObservations() {
        return observations;
    }

    public void setObservations(List<Observation> observations) {
        this.observations = observations;
    }
}



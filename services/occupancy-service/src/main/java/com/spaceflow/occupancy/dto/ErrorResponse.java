package com.spaceflow.occupancy.dto;

import jakarta.validation.constraints.NotBlank;

public class ErrorResponse {

    @NotBlank
    private String error;

    @NotBlank
    private String message;

    public ErrorResponse() {
    }

    public ErrorResponse(String error, String message) {
        this.error = error;
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}



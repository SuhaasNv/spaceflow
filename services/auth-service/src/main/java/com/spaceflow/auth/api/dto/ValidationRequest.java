package com.spaceflow.auth.api.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Request model for validation endpoint.
 * Matches OpenAPI schema: ValidationRequest
 */
public class ValidationRequest {

    @NotBlank(message = "Identity reference is required")
    private String identityReference;

    public ValidationRequest() {
    }

    public ValidationRequest(String identityReference) {
        this.identityReference = identityReference;
    }

    public String getIdentityReference() {
        return identityReference;
    }

    public void setIdentityReference(String identityReference) {
        this.identityReference = identityReference;
    }
}


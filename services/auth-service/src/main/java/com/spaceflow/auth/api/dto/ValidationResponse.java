package com.spaceflow.auth.api.dto;

/**
 * Response model for validation endpoint.
 * Matches OpenAPI schema: ValidationResponse
 */
public class ValidationResponse {

    private boolean valid;
    private String identityReference;
    private String role;

    public ValidationResponse() {
    }

    public ValidationResponse(boolean valid, String identityReference, String role) {
        this.valid = valid;
        this.identityReference = identityReference;
        this.role = role;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getIdentityReference() {
        return identityReference;
    }

    public void setIdentityReference(String identityReference) {
        this.identityReference = identityReference;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}


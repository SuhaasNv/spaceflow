package com.spaceflow.auth.api.dto;

/**
 * Response model for authentication endpoint.
 * Matches OpenAPI schema: AuthenticationResponse
 */
public class AuthenticationResponse {

    private String identityReference;
    private String role;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String identityReference, String role) {
        this.identityReference = identityReference;
        this.role = role;
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


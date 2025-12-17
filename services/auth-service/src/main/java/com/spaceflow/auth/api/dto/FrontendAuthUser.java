package com.spaceflow.auth.api.dto;

import java.util.UUID;

/**
 * Minimal user view returned to the frontend.
 *
 * Matches the shape expected by the SPA:
 * { "id": "<uuid>", "role": "<role>", "email": "<email>" }
 */
public class FrontendAuthUser {

    private UUID id;
    private String role;
    private String email;

    public FrontendAuthUser() {
    }

    public FrontendAuthUser(UUID id, String role) {
        this.id = id;
        this.role = role;
    }

    public FrontendAuthUser(UUID id, String role, String email) {
        this.id = id;
        this.role = role;
        this.email = email;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}



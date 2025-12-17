package com.spaceflow.auth.api.dto;

import java.util.UUID;

/**
 * Minimal user view returned to the frontend.
 *
 * Matches the shape expected by the SPA:
 * { "id": "<uuid>", "role": "<role>" }
 */
public class FrontendAuthUser {

    private UUID id;
    private String role;

    public FrontendAuthUser() {
    }

    public FrontendAuthUser(UUID id, String role) {
        this.id = id;
        this.role = role;
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
}



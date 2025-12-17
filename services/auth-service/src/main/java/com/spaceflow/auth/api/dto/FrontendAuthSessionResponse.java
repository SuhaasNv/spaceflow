package com.spaceflow.auth.api.dto;

/**
 * Response wrapper returned to the frontend for both login and session
 * validation flows.
 *
 * Shape:
 * {
 *   "user": { "id": "<uuid>", "role": "<role>" } | null
 * }
 */
public class FrontendAuthSessionResponse {

    private FrontendAuthUser user;

    public FrontendAuthSessionResponse() {
    }

    public FrontendAuthSessionResponse(FrontendAuthUser user) {
        this.user = user;
    }

    public FrontendAuthUser getUser() {
        return user;
    }

    public void setUser(FrontendAuthUser user) {
        this.user = user;
    }
}



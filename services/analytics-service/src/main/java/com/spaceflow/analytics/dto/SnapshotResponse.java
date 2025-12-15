package com.spaceflow.analytics.dto;

public class SnapshotResponse {

    private Scope scope;
    private SnapshotSummary summary;

    public Scope getScope() {
        return scope;
    }

    public void setScope(Scope scope) {
        this.scope = scope;
    }

    public SnapshotSummary getSummary() {
        return summary;
    }

    public void setSummary(SnapshotSummary summary) {
        this.summary = summary;
    }
}



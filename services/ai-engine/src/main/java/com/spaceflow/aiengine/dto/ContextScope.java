package com.spaceflow.aiengine.dto;

/**
 * Logical scope for advisory outputs (e.g., building, floor, team).
 */
public class ContextScope {

    private String type;
    private String id;

    public ContextScope() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}








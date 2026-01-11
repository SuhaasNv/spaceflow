package com.spaceflow.aiengine.service.analytics;

/**
 * Local mirror of Analytics Service PatternInsight.
 *
 * Included for completeness; current heuristics do not depend on it directly.
 */
public class PatternInsight {

    private String id;
    private String type;
    private String label;
    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}










package com.spaceflow.aiengine.dto;

import java.util.List;

/**
 * Advisory recommendation or insight produced by the AI Engine.
 * Non-authoritative guidance only.
 */
public class Recommendation {

    private String id;
    private String category;
    private String title;
    private String description;
    private Double confidence;
    private String impactLevel;
    private List<String> primaryReasons;
    private String createdAt;

    public Recommendation() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getConfidence() {
        return confidence;
    }

    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    public String getImpactLevel() {
        return impactLevel;
    }

    public void setImpactLevel(String impactLevel) {
        this.impactLevel = impactLevel;
    }

    public List<String> getPrimaryReasons() {
        return primaryReasons;
    }

    public void setPrimaryReasons(List<String> primaryReasons) {
        this.primaryReasons = primaryReasons;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}














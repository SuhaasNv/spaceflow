package com.spaceflow.aiengine.dto;

import java.util.List;

/**
 * Explanation and rationale behind a specific advisory recommendation.
 */
public class RecommendationExplanation {

    public static class ContributingSignal {

        private String label;
        private String influence;

        public ContributingSignal() {
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getInfluence() {
            return influence;
        }

        public void setInfluence(String influence) {
            this.influence = influence;
        }
    }

    public static class ConfidenceBreakdown {

        private Double overall;
        private String notes;

        public ConfidenceBreakdown() {
        }

        public Double getOverall() {
            return overall;
        }

        public void setOverall(Double overall) {
            this.overall = overall;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }
    }

    private String recommendationId;
    private String summary;
    private String detailedExplanation;
    private List<ContributingSignal> contributingSignals;
    private ConfidenceBreakdown confidenceBreakdown;
    private List<String> caveats;

    public RecommendationExplanation() {
    }

    public String getRecommendationId() {
        return recommendationId;
    }

    public void setRecommendationId(String recommendationId) {
        this.recommendationId = recommendationId;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDetailedExplanation() {
        return detailedExplanation;
    }

    public void setDetailedExplanation(String detailedExplanation) {
        this.detailedExplanation = detailedExplanation;
    }

    public List<ContributingSignal> getContributingSignals() {
        return contributingSignals;
    }

    public void setContributingSignals(List<ContributingSignal> contributingSignals) {
        this.contributingSignals = contributingSignals;
    }

    public ConfidenceBreakdown getConfidenceBreakdown() {
        return confidenceBreakdown;
    }

    public void setConfidenceBreakdown(ConfidenceBreakdown confidenceBreakdown) {
        this.confidenceBreakdown = confidenceBreakdown;
    }

    public List<String> getCaveats() {
        return caveats;
    }

    public void setCaveats(List<String> caveats) {
        this.caveats = caveats;
    }
}




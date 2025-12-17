package com.spaceflow.aiengine.service;

import com.spaceflow.aiengine.service.analytics.BookingUsageResponse;
import com.spaceflow.aiengine.service.analytics.PatternInsightsResponse;
import com.spaceflow.aiengine.service.analytics.UtilizationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * Thin HTTP client for calling the Analytics Service.
 *
 * NOTE: This client is intentionally simple and synchronous.
 * It only reads aggregated analytics views and never performs mutations.
 */
@Component
public class AnalyticsClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public AnalyticsClient(@Value("${services.analytics.base-url:http://analytics-service:8080}") String baseUrl) {
        this.baseUrl = baseUrl;
        this.restTemplate = new RestTemplate();
    }

    public UtilizationResponse getUtilization(String scopeType,
                                              String scopeId,
                                              String from,
                                              String to,
                                              String granularity) {
        String url = baseUrl
                + "/api/v1/utilization"
                + "?scopeType=" + scopeType
                + (scopeId != null ? "&scopeId=" + scopeId : "")
                + "&from=" + from
                + "&to=" + to
                + (granularity != null ? "&granularity=" + granularity : "");
        return restTemplate.getForObject(url, UtilizationResponse.class);
    }

    public BookingUsageResponse getBookingUsage(String scopeType,
                                                String scopeId,
                                                String from,
                                                String to,
                                                String granularity) {
        String url = baseUrl
                + "/api/v1/booking-usage"
                + "?scopeType=" + scopeType
                + (scopeId != null ? "&scopeId=" + scopeId : "")
                + "&from=" + from
                + "&to=" + to
                + (granularity != null ? "&granularity=" + granularity : "");
        return restTemplate.getForObject(url, BookingUsageResponse.class);
    }

    public PatternInsightsResponse getPatterns(String scopeType,
                                               String scopeId,
                                               String from,
                                               String to,
                                               String focus) {
        String url = baseUrl
                + "/api/v1/patterns"
                + "?scopeType=" + scopeType
                + (scopeId != null ? "&scopeId=" + scopeId : "")
                + (from != null ? "&from=" + from : "")
                + (to != null ? "&to=" + to : "")
                + (focus != null ? "&focus=" + focus : "");
        return restTemplate.getForObject(url, PatternInsightsResponse.class);
    }
}



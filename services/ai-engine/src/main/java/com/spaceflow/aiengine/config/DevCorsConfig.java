package com.spaceflow.aiengine.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Dev/local-only CORS configuration for the AI Engine service.
 *
 * This mirrors the Analytics Service setup so that the SpaceFlow
 * frontend (Vite dev server on http://localhost:5173) can call the
 * AI Engine directly on its own port during local development.
 *
 * Recommendations and explanations are advisory and read-only, so
 * this narrow CORS policy is sufficient for local use.
 */
@Configuration
public class DevCorsConfig {

    private static final String LOCAL_FRONTEND_ORIGIN = "http://localhost:5173";

    @Bean
    public WebMvcConfigurer devCorsWebMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(LOCAL_FRONTEND_ORIGIN)
                        .allowedMethods("GET", "OPTIONS")
                        .allowedHeaders("Authorization", "Content-Type");
            }
        };
    }
}








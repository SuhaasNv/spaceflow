package com.spaceflow.auth.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Simple, explicit CORS configuration for local development.
 *
 * Allows the SPA (running on http://localhost:5173) to call this service.
 * This is intentionally minimal and only meant for dev-time usage.
 */
@Configuration
public class WebCorsConfig {

    private static final String FRONTEND_ORIGIN = "http://localhost:5173";

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(FRONTEND_ORIGIN)
                        .allowedMethods("GET", "POST", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}



package com.spaceflow.auth.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Simple, explicit CORS configuration for local development.
 *
 * Allows the SPA (running on http://localhost:5173 or Docker frontend on http://localhost:3000)
 * to call this service. This is intentionally minimal and only meant for dev-time usage.
 */
@Configuration
public class WebCorsConfig {

    private static final String[] ALLOWED_ORIGINS = {
        "http://localhost:5173",  // Vite dev server
        "http://localhost:3000"   // Docker frontend
    };

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(ALLOWED_ORIGINS)
                        .allowedMethods("GET", "POST", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}



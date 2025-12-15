package com.spaceflow.analytics.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Dev/local-only CORS configuration for the Analytics Service.
 *
 * This is intentionally narrow to allow the SpaceFlow frontend
 * (Vite dev server on http://localhost:5173) to call the API
 * during local development without opening CORS broadly.
 */
@Configuration
public class DevCorsConfig {

    private static final String LOCAL_FRONTEND_ORIGIN = "http://localhost:5173";

    @Bean
    public WebMvcConfigurer devCorsWebMvcConfigurer(Environment environment) {
        // This bean is safe for all profiles but is explicitly intended
        // for dev/local usage. If needed, we can later gate this by profile.
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(LOCAL_FRONTEND_ORIGIN)
                        .allowedMethods("GET")
                        .allowedHeaders("Authorization", "Content-Type");
            }
        };
    }
}



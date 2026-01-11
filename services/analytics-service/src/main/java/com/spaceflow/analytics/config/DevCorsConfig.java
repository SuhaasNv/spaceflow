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
 * (Vite dev server on http://localhost:5173 or Docker frontend on http://localhost:3000)
 * to call the API during local development without opening CORS broadly.
 */
@Configuration
public class DevCorsConfig {

    private static final String[] ALLOWED_ORIGINS = {
        "http://localhost:5173",  // Vite dev server
        "http://localhost:3000"   // Docker frontend
    };

    @Bean
    public WebMvcConfigurer devCorsWebMvcConfigurer(Environment environment) {
        // This bean is safe for all profiles but is explicitly intended
        // for dev/local usage. If needed, we can later gate this by profile.
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(ALLOWED_ORIGINS)
                        .allowedMethods("GET")
                        .allowedHeaders("Authorization", "Content-Type");
            }
        };
    }
}



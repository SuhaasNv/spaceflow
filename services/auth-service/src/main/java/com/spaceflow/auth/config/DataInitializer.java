package com.spaceflow.auth.config;

import com.spaceflow.auth.domain.User;
import com.spaceflow.auth.domain.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

/**
 * Initializes default user data for local development and interviews.
 * Creates a default admin user if no users exist in the database.
 * 
 * Uses ApplicationReadyEvent to ensure database is fully initialized.
 */
@Component
@Order(1)
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
    private static final String DEFAULT_EMAIL = "admin@spaceflow.local";
    private static final String DEFAULT_PASSWORD = "admin123";
    private static final String DEFAULT_ROLE = "ADMIN";
    private static final String ACTIVE_STATUS = "ACTIVE";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeDefaultUser() {
        try {
            // Always check if the default user exists, regardless of total user count
            // This ensures the default user is available even if other users were created
            Optional<User> existingUser = userRepository.findByEmail(DEFAULT_EMAIL);
            
            if (existingUser.isEmpty()) {
                logger.info("========================================");
                logger.info("Creating default admin user for local development...");
                
                User defaultUser = new User();
                defaultUser.setEmail(DEFAULT_EMAIL);
                defaultUser.setPasswordHash(passwordEncoder.encode(DEFAULT_PASSWORD));
                defaultUser.setRole(DEFAULT_ROLE);
                defaultUser.setStatus(ACTIVE_STATUS);
                // createdAt will be set by @PrePersist, but we set it explicitly too
                defaultUser.setCreatedAt(Instant.now());
                
                User savedUser = userRepository.save(defaultUser);
                userRepository.flush(); // Ensure it's persisted immediately
                
                logger.info("========================================");
                logger.info("✓ Default admin user created successfully!");
                logger.info("  Email: {}", DEFAULT_EMAIL);
                logger.info("  Password: {}", DEFAULT_PASSWORD);
                logger.info("  Role: {}", DEFAULT_ROLE);
                logger.info("  User ID: {}", savedUser.getId());
                logger.info("========================================");
            } else {
                User user = existingUser.get();
                logger.info("Default admin user already exists:");
                logger.info("  Email: {}", user.getEmail());
                logger.info("  Role: {}", user.getRole());
                logger.info("  Status: {}", user.getStatus());
                
                // Verify password can be matched (for debugging)
                boolean passwordMatches = passwordEncoder.matches(DEFAULT_PASSWORD, user.getPasswordHash());
                if (!passwordMatches) {
                    logger.warn("WARNING: Stored password hash does not match expected password '{}'.", DEFAULT_PASSWORD);
                    logger.warn("The user may have been created with a different password.");
                } else {
                    logger.info("Password verification: OK");
                }
            }
        } catch (Exception e) {
            logger.error("Failed to initialize default user", e);
            // Don't throw - allow application to continue even if initialization fails
        }
    }
}


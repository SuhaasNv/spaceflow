# Service Interaction Rules

This document defines the allowed and forbidden interactions between services in the SpaceFlow platform. These rules ensure clear service boundaries, prevent circular dependencies, and maintain data ownership principles.

## Global Rules

### No Shared Data Ownership

Each service owns its data exclusively. No two services share ownership of the same data. Services may provide data to other services, but the providing service remains the authoritative source and owner of that data.

### No Circular Dependencies

Service dependencies must form a directed acyclic graph. If Service A depends on Service B, then Service B cannot depend on Service A. This ensures that services can be understood, tested, and deployed independently.

### Source of Truth Principles

Each type of data has a single source of truth:
- User identity and authorization: Auth Service
- Planned usage (bookings): Booking Service
- Actual usage (occupancy): Occupancy Service
- Analytical insights: Analytics Service
- Recommendations: AI Engine (presented to users, not stored as authoritative data)

Services must consult the appropriate source of truth rather than maintaining their own copies or interpretations of data owned by other services.

---

## Auth Service

### Allowed Interactions

The Auth Service can be consulted by all other services for authentication and authorization decisions. It operates independently and does not require data from other services to perform its core functions.

### Information Provided to Others

- User identity verification results
- Authorization decisions (whether a user can perform a specific action)
- User roles and permissions
- User account information (when authorized)

### Information Consumed from Others

- None. The Auth Service operates independently and does not consume business data from other services.

### Forbidden Interactions

- The Auth Service must not consume booking data, occupancy data, analytics, or recommendations
- The Auth Service must not make decisions about space allocation or optimization
- The Auth Service must not store or manage business data from other services

---

## Booking Service

### Allowed Interactions

- **Auth Service**: Consults for user identity verification and authorization decisions when users create, modify, view, or cancel bookings
- **Analytics Service**: Provides booking data (planned usage) for analysis

### Information Provided to Others

- Booking records (planned usage data)
- Booking schedules and availability information
- Historical booking data

### Information Consumed from Others

- Authorization decisions from Auth Service (to determine if users can perform booking operations)
- No business data from other services

### Forbidden Interactions

- The Booking Service must not interact with the Occupancy Service
- The Booking Service must not receive recommendations from the AI Engine
- The Booking Service must not perform analytics calculations
- The Booking Service must not consume occupancy data or actual usage information
- The Booking Service must not modify or interpret occupancy data

---

## Occupancy Service

### Allowed Interactions

- **Auth Service**: Consults for authorization decisions when determining who can view occupancy data
- **Analytics Service**: Provides occupancy data (actual usage) for analysis

### Information Provided to Others

- Occupancy records (actual usage data)
- Historical occupancy data
- Space utilization events (arrivals, departures)

### Information Consumed from Others

- Authorization decisions from Auth Service (to determine who can view occupancy data)
- No business data from other services

### Forbidden Interactions

- The Occupancy Service must not interact with the Booking Service
- The Occupancy Service must not receive recommendations from the AI Engine
- The Occupancy Service must not perform analytics calculations
- The Occupancy Service must not consume booking data or planned usage information
- The Occupancy Service must not correct or reconcile discrepancies with booking data
- The Occupancy Service must not interpret or analyze occupancy patterns

---

## Analytics Service

### Allowed Interactions

- **Auth Service**: Consults for authorization decisions when determining which users can access different types of analytics data
- **Booking Service**: Consumes booking data (planned usage) for analysis
- **Occupancy Service**: Consumes occupancy data (actual usage) for analysis
- **AI Engine**: Provides analytical insights and aggregated patterns

### Information Provided to Others

- Analytical insights about workspace utilization
- Metrics and measurements (booking accuracy, utilization rates, trends)
- Aggregated data patterns
- Reports and visualizations

### Information Consumed from Others

- Booking data from Booking Service (planned usage)
- Occupancy data from Occupancy Service (actual usage)
- Authorization decisions from Auth Service

### Forbidden Interactions

- The Analytics Service must not modify source data in the Booking Service or Occupancy Service
- The Analytics Service must not generate recommendations (that is the responsibility of the AI Engine)
- The Analytics Service must not enforce decisions or policies based on its analysis
- The Analytics Service must not manage bookings or collect raw occupancy data
- The Analytics Service must not make predictions about future behavior
- The Analytics Service must not provide raw events to the AI Engine (only processed insights)

---

## AI Engine

### Allowed Interactions

- **Auth Service**: Consults for authorization decisions when determining which users can access different types of recommendations
- **Analytics Service**: Consumes analytical insights and aggregated patterns
- **Booking Service**: May reference booking data for context (but primary input is analytical insights)
- **Occupancy Service**: May reference occupancy data for context (but primary input is analytical insights)

### Information Provided to Others

- Recommendations are presented to users through the platform interface, not provided to other services
- The AI Engine does not store recommendations as authoritative data

### Information Consumed from Others

- Analytical insights from Analytics Service (primary input)
- Aggregated patterns from Analytics Service
- Authorization decisions from Auth Service
- May reference booking and occupancy data for context, but does not consume raw events

### Forbidden Interactions

- The AI Engine must not consume raw booking events or occupancy events directly
- The AI Engine must not modify bookings in the Booking Service
- The AI Engine must not modify occupancy records in the Occupancy Service
- The AI Engine must not enforce recommendations or trigger automatic changes
- The AI Engine must not perform basic analytics calculations (that is the responsibility of the Analytics Service)
- The AI Engine must not provide recommendations back to the Booking Service, Occupancy Service, or Analytics Service
- The AI Engine must not make final decisions—it only provides recommendations for human review

---

## Interaction Patterns Summary

### Authorization Pattern

All services that need to make authorization decisions must consult the Auth Service. No service should implement its own authentication or authorization logic.

### Data Flow Pattern

- **Raw Data Sources**: Booking Service (planned usage) and Occupancy Service (actual usage) are independent data sources
- **Analysis Layer**: Analytics Service consumes from both Booking and Occupancy services to generate insights
- **Recommendation Layer**: AI Engine consumes insights from Analytics Service (and may reference raw data for context) to generate recommendations
- **No Reverse Flow**: Data flows from raw sources through analysis to recommendations, but recommendations do not flow back to modify source data

### Independence Principle

Booking Service and Occupancy Service operate independently and do not interact with each other. This separation ensures that planned usage and actual usage remain distinct concepts without cross-contamination.

### Read-Only Analysis Principle

Analytics Service and AI Engine are read-only with respect to source data. They consume data and generate insights or recommendations, but they do not modify the data in Booking Service or Occupancy Service.


# Service Responsibilities

This document defines the responsibilities and boundaries of each service within the SpaceFlow platform. SpaceFlow is a smart workplace intelligence platform that helps organizations understand and optimize office space usage by comparing planned usage (bookings) with actual usage (occupancy) and providing analytics and AI-driven recommendations.

---

## Auth Service

### Purpose

The Auth Service exists to establish and verify the identity of users and determine what actions they are permitted to perform within the SpaceFlow platform.

### Responsibilities

- Verifying user credentials and establishing authenticated sessions
- Managing user identities and their associated attributes
- Determining what resources and operations each user can access
- Issuing and validating tokens or credentials used for authentication across other services
- Managing user roles and permissions
- Handling user registration and account lifecycle operations

### Not Responsible For

- Storing or managing booking data
- Tracking occupancy information
- Performing analytics calculations
- Generating recommendations
- Managing workspace or room definitions

### System Contribution

The Auth Service provides the security foundation for SpaceFlow by ensuring only authorized users can access the platform and that their actions comply with their assigned permissions. All other services rely on authentication decisions from this service to protect their resources and operations.

---

## Booking Service

### Purpose

The Booking Service exists to manage planned usage of workspace resources, enabling users to reserve spaces for specific times and purposes.

### Responsibilities

- Creating, updating, and canceling space reservations
- Managing booking schedules and availability
- Enforcing booking rules and constraints
- Maintaining historical booking records
- Handling recurring bookings and booking patterns
- Validating booking conflicts and time slot availability

### Not Responsible For

- Verifying user identity or managing permissions
- Tracking whether reserved spaces are actually occupied
- Calculating analytics or generating insights
- Providing recommendations for space optimization
- Managing physical space configurations or sensors

### System Contribution

The Booking Service captures the "planned usage" side of SpaceFlow's core value proposition by maintaining a comprehensive record of when and where users intend to use workspace resources. This planned usage data serves as the baseline against which actual occupancy is compared to identify utilization patterns and optimization opportunities.

---

## Occupancy Service

### Purpose

The Occupancy Service exists to track actual usage of workspace resources, recording when and where people are physically present in the office.

### Responsibilities

- Collecting real-time occupancy data from sensors and other sources
- Recording when spaces are actually occupied versus vacant
- Maintaining historical occupancy records
- Processing and normalizing occupancy data from various input sources
- Detecting occupancy events such as arrivals and departures
- Managing occupancy data quality and accuracy

### Not Responsible For

- Managing planned reservations or bookings
- Verifying user identity or managing access control
- Performing analytics calculations or generating reports
- Creating recommendations for space optimization
- Managing sensor hardware or device configurations

### System Contribution

The Occupancy Service captures the "actual usage" side of SpaceFlow's core value proposition by maintaining a record of real-world space utilization. This actual usage data, when compared with planned bookings, enables the platform to identify gaps between intention and reality, which forms the foundation for analytics and optimization recommendations.

---

## Analytics Service

### Purpose

The Analytics Service exists to process booking and occupancy data to generate insights about workspace utilization patterns, trends, and efficiency.

### Responsibilities

- Comparing planned bookings against actual occupancy to identify utilization patterns
- Calculating metrics such as booking accuracy, space utilization rates, and occupancy trends
- Generating reports and visualizations about workspace usage
- Identifying anomalies and patterns in space utilization
- Aggregating data across time periods, locations, and user groups
- Providing historical analysis and trend identification

### Not Responsible For

- Managing individual bookings or reservations
- Collecting raw occupancy data from sensors
- Verifying user identity or managing permissions
- Generating specific optimization recommendations
- Managing user accounts or authentication

### System Contribution

The Analytics Service transforms raw booking and occupancy data into actionable insights, enabling organizations to understand how their workspace is actually being used. By identifying patterns, trends, and discrepancies between planned and actual usage, this service provides the analytical foundation that informs both human decision-making and AI-driven recommendations.

---

## AI Engine

### Purpose

The AI Engine exists to generate intelligent recommendations for optimizing workspace usage based on patterns identified in booking and occupancy data.

### Responsibilities

- Analyzing utilization patterns to identify optimization opportunities
- Generating recommendations for space allocation, booking policies, and workspace configuration
- Learning from historical data to improve recommendation accuracy
- Identifying predictive patterns in workspace usage
- Providing personalized suggestions for individual users or teams
- Adapting recommendations based on changing usage patterns over time

### Not Responsible For

- Managing bookings or reservations directly
- Collecting occupancy data from sensors
- Performing basic analytics calculations or generating standard reports
- Verifying user identity or managing access control
- Storing or managing user account information

### System Contribution

The AI Engine adds intelligence to SpaceFlow by transforming analytical insights into actionable recommendations, helping organizations proactively optimize their workspace rather than simply understanding current usage. By learning from historical patterns and identifying optimization opportunities, this service enables data-driven decision-making that can improve space efficiency and user experience.


# Roles and Capabilities

This document defines the roles within SpaceFlow and the capabilities associated with each role. Roles are defined by decision-making responsibility and the actions they can perform, not by organizational hierarchy.

---

## Platform Admin

### Who This Role Represents

Platform Admins are individuals responsible for managing the SpaceFlow platform itself. They ensure the system is properly configured, users have appropriate access, and the platform operates correctly for the organization.

### Decisions This Role Is Responsible For

- Determining which users can access the platform and what roles they should have
- Deciding how the platform should be configured for the organization
- Establishing system-wide settings and preferences
- Resolving platform-level issues and access problems

### Actions This Role Can Perform

- Add, remove, and modify user accounts
- Assign roles to users
- Configure organization-wide settings
- View all data across the platform
- Manage system configuration
- Access platform administration functions

### What This Role Is Not Allowed To Do

- Cannot make decisions about space allocation or workspace optimization strategies
- Cannot modify booking or occupancy data directly
- Cannot generate analytics reports or recommendations
- Cannot perform actions reserved for Facilities Managers regarding space management

---

## Facilities Manager

### Who This Role Represents

Facilities Managers are individuals responsible for managing physical workspace resources and making decisions about space allocation, optimization, and utilization within their organization.

### Decisions This Role Is Responsible For

- Determining how workspace resources should be allocated and optimized
- Deciding which spaces should be available for booking
- Interpreting analytics and recommendations to make space management decisions
- Establishing policies for space usage and booking rules

### Actions This Role Can Perform

- View comprehensive analytics and reports about space utilization
- Access AI-generated recommendations for space optimization
- Configure which spaces are available for booking
- View all bookings and occupancy data across the organization
- Compare planned usage against actual usage
- Export analytics data and reports
- Set booking rules and constraints

### What This Role Is Not Allowed To Do

- Cannot manage user accounts or assign roles to other users
- Cannot modify platform configuration or system settings
- Cannot create bookings on behalf of other users
- Cannot access platform administration functions

---

## Employee

### Who This Role Represents

Employees are regular users of the SpaceFlow platform who need to book workspace resources for their work activities and may want to understand their own usage patterns.

### Decisions This Role Is Responsible For

- Deciding which spaces to book and when
- Choosing whether to view their own usage data and recommendations
- Determining their workspace needs for specific time periods

### Actions This Role Can Perform

- Create, modify, and cancel their own space bookings
- View their own booking history
- View their personal usage statistics
- Access personalized recommendations for their workspace usage
- View availability of spaces for booking

### What This Role Is Not Allowed To Do

- Cannot view analytics or reports about other users or organization-wide usage
- Cannot modify or cancel bookings made by other users
- Cannot access facilities management functions
- Cannot view occupancy data beyond their own usage
- Cannot configure spaces or booking rules
- Cannot manage other users' accounts

---

## System Service

### Who This Role Represents

System Service is a non-human role that represents automated processes and background operations within SpaceFlow. These are system-level functions that operate without direct human intervention.

### Decisions This Role Is Responsible For

- Determining when to process data and generate analytics
- Deciding when to trigger automated recommendations
- Determining data processing schedules and priorities

### Actions This Role Can Perform

- Collect occupancy data from sensors and other sources
- Process booking and occupancy data to generate analytics
- Calculate utilization metrics and trends
- Generate AI-driven recommendations based on usage patterns
- Perform scheduled data processing and aggregation
- Maintain data consistency and integrity

### What This Role Is Not Allowed To Do

- Cannot make business decisions about space allocation or optimization
- Cannot create, modify, or cancel bookings
- Cannot access user account information beyond what is necessary for processing
- Cannot modify user roles or permissions
- Cannot perform actions that require human judgment or approval

---

## Role Capability Matrix

The following table maps each role to the high-level capabilities they can perform within SpaceFlow.

| Capability | Platform Admin | Facilities Manager | Employee | System Service |
|------------|----------------|-------------------|----------|----------------|
| Manage user accounts | Yes | No | No | No |
| Assign user roles | Yes | No | No | No |
| Configure platform settings | Yes | No | No | No |
| View organization-wide analytics | Yes | Yes | No | No |
| View personal usage analytics | Yes | Yes | Yes | No |
| View AI recommendations | Yes | Yes | Yes | No |
| Export reports | Yes | Yes | No | No |
| Configure spaces for booking | Yes | Yes | No | No |
| Set booking rules | Yes | Yes | No | No |
| Create bookings | Yes | Yes | Yes | No |
| Modify own bookings | Yes | Yes | Yes | No |
| View own booking history | Yes | Yes | Yes | No |
| View space availability | Yes | Yes | Yes | No |
| Process occupancy data | No | No | No | Yes |
| Generate analytics | No | No | No | Yes |
| Generate recommendations | No | No | No | Yes |


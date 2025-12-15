# System Context

## System Boundary

SpaceFlow is a smart workplace intelligence platform that helps organizations understand and optimize office space usage. The system operates within an organization's workspace environment, collecting data about planned and actual space utilization, processing this information to generate insights, and providing recommendations to support decision-making. SpaceFlow's boundary encompasses all internal services that manage user authentication, bookings, occupancy tracking, analytics, and recommendations, while interacting with external actors including human users in various roles and automated systems that provide occupancy data.

## External Actors

### Platform Admin

Platform Admins are individuals responsible for managing the SpaceFlow platform itself. They interact with the system to manage user accounts, assign roles to users, configure organization-wide settings, and ensure the platform operates correctly. They have access to all data across the platform but do not make decisions about space allocation or optimization strategies.

**Interactions with SpaceFlow:**
- Manage user accounts and assign roles
- Configure platform settings and preferences
- View all data across the platform for administrative purposes
- Access platform administration functions

### Facilities Manager

Facilities Managers are individuals responsible for managing physical workspace resources and making decisions about space allocation, optimization, and utilization. They use SpaceFlow to understand workspace usage patterns, access recommendations, and make informed decisions about space management.

**Interactions with SpaceFlow:**
- View comprehensive analytics and reports about space utilization
- Access AI-generated recommendations for space optimization
- Configure which spaces are available for booking
- View all bookings and occupancy data across the organization
- Set booking rules and constraints
- Export analytics data and reports

### Employee

Employees are regular users who need to book workspace resources for their work activities. They interact with SpaceFlow primarily to reserve spaces and understand their own usage patterns.

**Interactions with SpaceFlow:**
- Create, modify, and cancel their own space bookings
- View their own booking history
- View their personal usage statistics
- Access personalized recommendations for their workspace usage
- View availability of spaces for booking

### Occupancy Data Sources

Occupancy Data Sources are external systems, sensors, or devices that provide information about actual physical presence in workspace areas. These non-human actors supply raw occupancy data to SpaceFlow, indicating when and where people are physically present in the office.

**Interactions with SpaceFlow:**
- Provide real-time occupancy data
- Report occupancy events such as arrivals and departures
- Supply historical occupancy information

## Internal Services

### Auth Service

The Auth Service establishes and verifies the identity of users accessing SpaceFlow and determines what actions they are permitted to perform. It serves as the security foundation for the entire system, acting as the single source of truth for user identity and authorization decisions.

**Role in System:**
- Provides authentication and authorization for all user interactions
- Manages user accounts, roles, and permissions
- Enables other services to make security decisions without implementing their own authentication logic

### Booking Service

The Booking Service manages planned usage of workspace resources by enabling users to reserve spaces for specific times and purposes. It captures user intent about when and where they plan to use office spaces, creating a record of expected utilization.

**Role in System:**
- Maintains the authoritative record of planned workspace usage
- Manages booking schedules, availability, and rules
- Provides booking data for comparison with actual usage

### Occupancy Service

The Occupancy Service tracks actual usage of workspace resources by recording when and where people are physically present in the office. It captures what really happened in the workspace, creating a factual record of real-world space utilization.

**Role in System:**
- Maintains the authoritative record of actual workspace usage
- Collects and normalizes occupancy data from external sources
- Provides occupancy data for comparison with planned usage

### Analytics Service

The Analytics Service processes booking and occupancy data to generate insights about workspace utilization patterns, trends, and efficiency. It transforms raw data into understandable information by comparing planned usage against actual usage.

**Role in System:**
- Performs analysis and comparison of planned versus actual usage
- Calculates metrics and identifies patterns
- Generates reports and insights for decision-makers
- Provides analytical foundation for recommendations

### AI Engine

The AI Engine generates intelligent recommendations for optimizing workspace usage based on patterns identified in booking and occupancy data. It serves as a decision support system that helps humans make better space-related decisions.

**Role in System:**
- Analyzes utilization patterns to identify optimization opportunities
- Generates recommendations for space allocation and booking policies
- Provides personalized suggestions for users and teams
- Enhances human decision-making without replacing it

## Information Flow

### User Authentication and Authorization Flow

When any user (Platform Admin, Facilities Manager, or Employee) attempts to interact with SpaceFlow, the system first verifies their identity and determines their permissions. All services consult the Auth Service for these security decisions, ensuring consistent access control across the platform.

### Booking Flow

Employees and Facilities Managers create bookings through the Booking Service, which records their intent to use specific spaces at specific times. The Booking Service verifies with the Auth Service that the user has permission to create bookings. The booking data is then available to the Analytics Service for analysis.

### Occupancy Data Flow

External occupancy data sources provide information about actual physical presence to the Occupancy Service. The Occupancy Service records this factual data without interpretation, maintaining it as ground truth about actual usage. This occupancy data is then available to the Analytics Service for comparison with planned bookings.

### Analytics Generation Flow

The Analytics Service consumes booking data from the Booking Service and occupancy data from the Occupancy Service. It compares planned usage against actual usage to identify patterns, discrepancies, and trends. The Analytics Service generates insights, metrics, and reports that help users understand workspace utilization. These analytical insights are provided to the AI Engine and made available to Facilities Managers and Platform Admins for viewing.

### Recommendation Generation Flow

The AI Engine consumes analytical insights from the Analytics Service, using these pre-processed patterns to generate intelligent recommendations. The AI Engine may also reference booking and occupancy data for additional context. Recommendations are presented to users (Employees, Facilities Managers, and Platform Admins) through the platform interface, where humans review and decide whether to act on them.

### Data Independence Principle

The Booking Service and Occupancy Service operate independently and do not interact with each other. This separation ensures that planned usage and actual usage remain distinct concepts. The comparison and analysis of these two data sources occurs only within the Analytics Service, which reads from both sources without modifying them.

### Read-Only Analysis Principle

Both the Analytics Service and AI Engine operate in a read-only manner with respect to source data. They consume data from the Booking Service and Occupancy Service to generate insights and recommendations, but they do not modify the source data. All changes to bookings or occupancy records must be made through their respective services.


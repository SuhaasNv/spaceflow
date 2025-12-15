# Booking Service

## Purpose

The Booking Service manages planned usage of workspace resources by enabling users to reserve spaces for specific times and purposes. It captures user intent about when and where they plan to use office spaces, creating a record of expected utilization that serves as the baseline for comparing planned versus actual usage across the SpaceFlow platform.

## Responsibilities

- Creating, updating, and canceling space reservations
- Managing booking schedules and availability
- Enforcing booking rules and constraints
- Maintaining historical booking records
- Handling recurring bookings and booking patterns
- Validating booking conflicts and time slot availability
- Recording user intent for workspace usage

## Non-Responsibilities

- Verifying user identity or managing permissions
- Tracking whether reserved spaces are actually occupied
- Calculating analytics or generating insights
- Providing recommendations for space optimization
- Managing physical space configurations or sensors
- Inferring or predicting user behavior
- Making decisions about space allocation or optimization strategies

## Service Interactions

The Booking Service relies on the Auth Service to verify user identity and determine whether users have permission to create, modify, or view bookings. It does not make security decisions independently and must consult the Auth Service for all access control decisions.

The service provides booking data to the Analytics Service, which compares planned bookings against actual occupancy data from the Occupancy Service to identify utilization patterns and discrepancies. The Analytics Service uses this comparison to generate insights about workspace efficiency and booking accuracy.

The AI Engine consumes booking data along with analytics results to identify patterns and generate recommendations for space optimization. However, the Booking Service itself does not receive or process recommendations—it simply maintains the record of user intent.

The service operates independently from the Occupancy Service, meaning it does not need to know whether a booked space is actually occupied. This separation ensures the service remains simple and focused solely on managing planned usage without making assumptions about actual behavior.

## Assumptions and Constraints

- Bookings represent user intent and planned usage, not actual usage
- The service operates deterministically based on explicit user actions and booking rules
- The service does not infer, predict, or assume user behavior beyond what is explicitly stated in bookings
- Booking data serves as the baseline for comparison with actual occupancy, but the service does not perform this comparison itself
- The service must be available for users to create and manage bookings, but it does not require other services to be available to perform its core functions
- All security and authorization decisions are delegated to the Auth Service
- The service maintains a complete historical record of all bookings, including cancellations and modifications


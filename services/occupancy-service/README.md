# Occupancy Service

## Purpose

The Occupancy Service tracks actual usage of workspace resources by recording when and where people are physically present in the office. It captures what really happened in the workspace, creating a factual record of real-world space utilization that serves as ground truth for comparing actual usage against planned bookings across the SpaceFlow platform.

## Responsibilities

- Collecting occupancy data from various input sources
- Recording when spaces are actually occupied versus vacant
- Maintaining historical occupancy records
- Processing and normalizing occupancy data from different sources
- Detecting occupancy events such as arrivals and departures
- Handling incomplete or inconsistent input data gracefully
- Preserving the factual nature of occupancy records without interpretation

## Non-Responsibilities

- Managing planned reservations or bookings
- Verifying user identity or managing access control
- Performing analytics calculations or generating reports
- Creating recommendations for space optimization
- Interpreting or analyzing occupancy patterns
- Correcting or reconciling discrepancies with booking data
- Making judgments about data quality or accuracy beyond basic normalization
- Managing hardware or device configurations

## Service Interactions

The Occupancy Service operates independently from the Booking Service and does not need to know about planned reservations. It simply records what actually happened in the workspace, maintaining a clear separation between actual usage and planned usage.

The service provides occupancy data to the Analytics Service, which performs the comparison between actual occupancy and planned bookings to identify utilization patterns and discrepancies. The Occupancy Service does not perform this comparison itself—it only supplies the factual record of actual usage.

The AI Engine consumes occupancy data along with analytics results to identify patterns and generate recommendations. However, the Occupancy Service itself does not receive or process recommendations or insights—it maintains its role as a factual data source.

The service relies on the Auth Service only for administrative operations, such as determining who can view occupancy data. It does not require the Auth Service to collect or record occupancy information, as occupancy events are recorded based on physical presence rather than user identity verification.

## Assumptions and Constraints

- Occupancy data represents factual ground truth about actual space usage
- The service records what happened without interpretation, analysis, or judgment
- The service does not correct or reconcile mismatches with booking data—it only records actual occupancy
- The service must be resilient to incomplete, inconsistent, or noisy input data
- Occupancy records are maintained as an accurate historical record of real-world events
- The service operates independently and does not require other services to be available to collect occupancy data
- All security and authorization decisions for viewing occupancy data are delegated to the Auth Service
- The service maintains data integrity by preserving the factual nature of occupancy records without modification or interpretation


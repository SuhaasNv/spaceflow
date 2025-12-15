# Occupancy Service API Contract

## Purpose

The Occupancy Service API records and provides access to actual observed usage of office spaces within the SpaceFlow platform. Unlike the Booking Service which manages planned usage, this service captures what actually happened—real occupancy events that occurred in physical spaces. The service is observational in nature, meaning it records data as it is observed rather than enforcing rules or resolving conflicts. Data within this service may arrive with delays, may be incomplete for certain time periods, and may be corrected or updated as more accurate information becomes available. The service does not perform analytics, optimization, or inference—it simply records and serves occupancy observations as they are received.

## Core Capabilities

### Occupancy Recording

Accepts observations of actual space usage as they occur or are reported. The service records these observations without validation against bookings or other constraints. Each observation represents a factual record of occupancy at a specific space and time, regardless of whether it aligns with planned usage or conflicts with other observations. The service accepts observations even if they arrive late or out of sequence, maintaining a historical record of actual space utilization.

### Occupancy Retrieval

Provides access to recorded occupancy observations based on query criteria such as space, time period, or observation identifier. The service returns the occupancy data that has been recorded, which may be complete or incomplete depending on what observations have been received. The service does not infer missing data or fill gaps—it returns only what has been observed and recorded.

### Occupancy Correction

Allows updates to previously recorded occupancy observations when more accurate information becomes available or errors are discovered. Corrections may adjust the time period, space, or other details of an observation. The service maintains a record of corrections but does not prevent conflicting observations from existing—multiple observations for the same space and time may coexist, representing the observational and potentially uncertain nature of the data.

### Occupancy Query by Space and Time

Enables consumers to query occupancy observations for specific spaces within defined time windows. This capability supports understanding actual usage patterns by retrieving all observations that fall within the requested parameters. The service returns observations as they were recorded, without filtering for conflicts or inconsistencies.

## API Consumers

### Internal Services

Other SpaceFlow services consume the Occupancy Service API to access actual usage data. The Analytics Service retrieves occupancy observations to generate reports and insights about space utilization patterns. The AI Engine queries occupancy data to understand historical usage when making recommendations. The Booking Service may compare planned bookings against actual occupancy to identify discrepancies. These services use occupancy data for analysis and decision-making, understanding that the data represents observations rather than authoritative truth.

### Space Administrators

Space Administrators access the Occupancy Service API to view actual usage of spaces under their administration. They use this information to understand how spaces are being utilized in practice, identify patterns, and make informed decisions about space management. They understand that occupancy data may be incomplete or delayed, and they may use it alongside booking data to get a complete picture.

### Platform Admins

Platform Admins interact with the Occupancy Service API to access occupancy data across the entire platform. They may use this data for administrative purposes, system monitoring, or to understand overall platform usage patterns. They have the highest level of access to occupancy data and may also perform corrections or updates when necessary.

### Data Collection Systems

External systems that collect occupancy information, such as sensor networks, access control systems, or manual reporting tools, consume the Occupancy Service API to submit observations. These systems provide the raw observational data that the service records. They may submit data in real-time, in batches, or with delays, and the service accepts all valid observations regardless of timing or potential conflicts with other data.

### Reporting and Analytics Tools

External reporting tools and analytics platforms may query the Occupancy Service API to retrieve occupancy data for analysis, visualization, or integration with other systems. These tools understand that occupancy data is observational and may require additional processing to handle incomplete data, delays, or inconsistencies.

## Request and Response Behavior

### Occupancy Recording

**Request:** A consumer provides an observation of actual space usage, including the space where occupancy was observed, the time period during which occupancy occurred, and any relevant details about the observation such as the method of detection or confidence level.

**Response:** Upon successful recording, the service confirms the observation was recorded and provides an observation identifier. The service accepts the observation regardless of whether it conflicts with bookings, other observations, or seems unusual—it records what was observed without judgment or validation.

**Behavior:** The service records the observation as provided, assigning it a unique identifier and timestamp. It does not validate the observation against bookings, check for conflicts with other observations, or reject observations that seem inconsistent. The service accepts observations even if they arrive late, are out of sequence, or conflict with previously recorded data. Multiple observations for the same space and time may coexist, representing the observational nature of the data.

### Occupancy Retrieval

**Request:** A consumer provides criteria for the occupancy observations they wish to retrieve, such as a specific observation identifier, a space identifier, or a time range.

**Response:** The service provides the requested occupancy observations, including all relevant details as they were recorded. The response may include a single observation or a collection of observations that match the criteria. If no observations match the criteria, the service indicates that no observations were found. The service does not infer missing data or fill gaps—it returns only what has been observed and recorded.

**Behavior:** The service retrieves observations that match the provided criteria and returns them to the consumer. It does not filter for conflicts, validate consistency, or perform any analysis. The service returns observations exactly as they were recorded, which may include multiple observations for the same space and time, incomplete data for certain periods, or observations that arrived late. The consumer is responsible for interpreting and handling any inconsistencies or gaps in the data.

### Occupancy Correction

**Request:** A consumer provides an observation identifier and updated information to correct a previously recorded observation, or provides a new observation that supersedes an earlier one.

**Response:** Upon successful correction, the service confirms the observation was updated and provides the corrected observation information. The service may maintain a record of the original observation and the correction, allowing consumers to understand the history of changes.

**Behavior:** The service updates the specified observation with the corrected information. It does not remove the original observation but may mark it as superseded or corrected. The service does not validate corrections against other observations or bookings—it simply records the correction as provided. Multiple versions of observations for the same space and time may exist, representing the iterative and potentially uncertain nature of observational data.

### Occupancy Query by Space and Time

**Request:** A consumer provides a space identifier and a time window, requesting all occupancy observations for that space during the specified period.

**Response:** The service provides all occupancy observations that fall within the requested space and time window. The response includes all matching observations as they were recorded, which may include overlapping observations, gaps in coverage, or observations that seem inconsistent.

**Behavior:** The service retrieves all observations where the observed space matches the requested space and the observation time overlaps with the requested time window. It returns observations exactly as recorded, without filtering, deduplication, or conflict resolution. The service may return multiple observations for the same time period if they were recorded separately, or it may return no observations for certain periods if none were received. The consumer is responsible for interpreting the data and handling any inconsistencies or gaps.

## Error and Uncertainty Scenarios

### Incomplete Data

When occupancy observations are missing for certain spaces or time periods, the service simply returns no observations for those periods. The service does not indicate whether the absence of data means the space was unoccupied or whether observations were simply not received. Consumers must interpret missing data based on their own context and requirements.

### Delayed Observations

When occupancy observations arrive after the time period they describe has passed, the service accepts and records them regardless of the delay. The service does not reject late observations or attempt to determine their accuracy based on timing. Consumers querying recent time periods may receive incomplete results initially, with additional observations appearing later as delayed data arrives.

### Conflicting Observations

When multiple occupancy observations exist for the same space and time period that seem to conflict or contradict each other, the service returns all of them without attempting to resolve the conflict. The service treats each observation as a valid record of what was observed, regardless of whether it conflicts with other observations. Consumers are responsible for determining how to handle conflicting observations based on their specific needs.

### Data Corrections and Updates

When occupancy observations are corrected or updated, the service maintains records of both the original and corrected versions. Consumers querying occupancy data may receive multiple versions of observations for the same space and time, requiring them to determine which version to use. The service does not automatically select the "best" or "most recent" version—it returns all versions and lets consumers decide.

### Observation Quality and Confidence

When occupancy observations include quality indicators or confidence levels, the service records and returns this information but does not filter or weight observations based on quality. Low-confidence observations are treated the same as high-confidence observations—both are recorded and returned. Consumers must evaluate quality indicators themselves when interpreting the data.

### Service Unavailability During Observation Periods

If the Occupancy Service is temporarily unavailable when occupancy events occur, those observations may be lost or submitted later with delays. The service does not attempt to infer what happened during unavailability periods or fill gaps with estimated data. When the service becomes available again, it accepts delayed observations but does not backfill missing periods.

### Unobservable Periods

For certain spaces or time periods, occupancy may be unobservable due to various reasons. The service does not distinguish between periods where no observations were received because the space was unoccupied versus periods where observations were not possible. Consumers must interpret the absence of data based on their understanding of observation capabilities and space characteristics.

### Observation Method Variations

Different observation methods may produce different types or qualities of occupancy data. The service records all observations regardless of their method or source, without normalizing or standardizing them. Consumers may receive observations with varying levels of detail, accuracy, or format, and must handle these variations appropriately.


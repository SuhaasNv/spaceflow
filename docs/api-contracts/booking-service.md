# Booking Service API Contract

## Purpose

The Booking Service API manages planned usage of office spaces within the SpaceFlow platform. It serves as the authoritative source for all booking intentions, representing when and where users plan to use office resources. The service provides deterministic and predictable behavior for creating, modifying, and querying bookings, ensuring that space allocation conflicts are identified and resolved at the time of booking creation or modification. The service focuses exclusively on managing booking intent—it does not track actual usage, perform analytics, or make inferences about space utilization patterns.

## Core Capabilities

### Booking Creation

Establishes a new booking for a specific space and time period. The service validates that the requested space and time are available, checks for conflicts with existing bookings, and creates the booking if no conflicts exist. This capability ensures that all bookings are valid and conflict-free at the moment they are created.

### Booking Modification

Allows changes to existing bookings, such as adjusting the time period, changing the space, or updating booking details. The service re-validates availability and conflict status based on the modified parameters, ensuring that changes do not create conflicts with other bookings. If a modification would create a conflict, the service prevents the change.

### Booking Cancellation

Removes a booking from the system, making the previously reserved space and time available for other bookings. Cancellation is immediate and deterministic—once canceled, the space and time are immediately available for new bookings.

### Booking Retrieval

Provides access to booking information for authorized consumers. This capability enables users and other services to view existing bookings, check booking details, and understand current space allocation. The service may support various query patterns, such as retrieving bookings for a specific space, time period, or user.

### Availability Checking

Determines whether a specific space is available during a requested time period. This capability allows consumers to check availability before attempting to create a booking, helping users make informed decisions about space selection. The service considers all existing bookings when determining availability.

### Conflict Detection and Resolution

Identifies when a booking request would conflict with existing bookings and resolves these conflicts at booking time. The service is deterministic in its conflict resolution—it either prevents the conflicting booking from being created or modified, or applies a predefined resolution strategy. Conflicts are always resolved at the time of booking creation or modification, never retroactively.

## API Consumers

### End Users

Individual users interact with the Booking Service API to create, modify, and cancel their own bookings. They use the service to reserve office spaces for meetings, work sessions, or other activities. Users also query the service to view their existing bookings and check space availability before making new reservations.

### Space Administrators

Space Administrators use the Booking Service API to manage bookings across their assigned spaces. They may view all bookings for spaces under their administration, modify or cancel bookings when necessary, and check availability patterns. They have broader access to booking information than regular users.

### Platform Admins

Platform Admins interact with the Booking Service API to view and manage bookings across the entire platform. They may access booking information for administrative purposes, resolve booking issues, and ensure the service operates correctly. They have the highest level of access to booking data and operations.

### Internal Services

Other SpaceFlow services consume the Booking Service API to understand planned space usage. The Occupancy Service may query bookings to compare planned versus actual usage. The Analytics Service may retrieve booking data for reporting purposes. The AI Engine may check booking availability when making recommendations. These services read booking information but typically do not create or modify bookings directly.

### External Integrations

External systems, such as calendar applications or room booking systems, may integrate with the Booking Service API to synchronize bookings or provide booking capabilities through their own interfaces. These integrations consume the same capabilities as other consumers, with access levels determined by their authentication and authorization.

## Request and Response Behavior

### Booking Creation

**Request:** A consumer provides information about the desired booking, including the space to be reserved, the time period, and any relevant booking details such as the purpose or number of attendees.

**Response:** Upon successful creation, the service confirms the booking was created and provides a booking identifier and complete booking information. If the booking cannot be created due to conflicts or unavailability, the service indicates the reason for failure and may provide information about alternative available times or spaces.

**Behavior:** The service validates that the requested space exists and is available during the requested time period. It checks for conflicts with existing bookings, considering the exact time overlap. If no conflicts exist, the booking is created immediately and the space becomes unavailable for the specified time period. The service is deterministic—given the same set of existing bookings and the same request, it will always produce the same result.

### Booking Modification

**Request:** A consumer provides the booking identifier and the changes they wish to make, such as a new time period, different space, or updated booking details.

**Response:** Upon successful modification, the service confirms the changes were applied and provides the updated booking information. If the modification would create a conflict or is otherwise invalid, the service indicates the reason and may suggest alternative modifications that would be valid.

**Behavior:** The service first validates that the booking exists and that the requester has permission to modify it. It then re-evaluates availability and conflicts based on the modified parameters. If the modification would create a conflict with another booking, the change is rejected. If valid, the modification is applied immediately, and the service updates availability accordingly. The original space and time become available if they are no longer part of the modified booking.

### Booking Cancellation

**Request:** A consumer provides the booking identifier and requests cancellation of the booking.

**Response:** The service confirms the booking was canceled and the space and time are now available. If the booking cannot be canceled (for example, if it does not exist or has already been canceled), the service indicates the current state of the booking.

**Behavior:** The service validates that the booking exists and that the requester has permission to cancel it. Upon cancellation, the booking is immediately removed from the system, and the space and time become available for new bookings. Cancellation is immediate and final—there is no pending state or delay in making the space available.

### Booking Retrieval

**Request:** A consumer provides criteria for the bookings they wish to retrieve, such as a specific booking identifier, a space identifier, a time range, or a user identifier.

**Response:** The service provides the requested booking information, including all relevant booking details. The response may include a single booking or a collection of bookings that match the criteria. If no bookings match the criteria, the service indicates that no bookings were found.

**Behavior:** The service verifies that the requester has permission to access the requested booking information. It retrieves bookings that match the provided criteria and returns them to the consumer. The service may filter results based on the requester's permissions, ensuring users can only access bookings they are authorized to view.

### Availability Checking

**Request:** A consumer provides a space identifier and a time period, asking whether the space is available during that time.

**Response:** The service indicates whether the space is available during the requested time period. The response may include information about existing bookings that affect availability, such as bookings that overlap with the requested time period.

**Behavior:** The service checks all existing bookings for the specified space and time period. It determines whether any bookings overlap with the requested time, considering the exact start and end times. The service provides a clear indication of availability, which is deterministic based on the current set of bookings. The response reflects the state at the time of the request—availability may change if bookings are created, modified, or canceled after the check.

### Conflict Detection and Resolution

**Request:** This capability is invoked automatically during booking creation and modification requests. A consumer may also explicitly request conflict checking for a proposed booking.

**Response:** If conflicts are detected, the service indicates which existing bookings conflict with the proposed booking and provides information about the nature of the conflict. If no conflicts exist, the service confirms that the booking can proceed.

**Behavior:** The service compares the proposed booking against all existing bookings for the same space during overlapping time periods. It identifies exact conflicts where two bookings would occupy the same space at the same time. Conflicts are resolved deterministically at booking time—the service either prevents the conflicting booking from being created or modified, or applies a predefined resolution strategy. The service does not perform retroactive conflict resolution or allow conflicting bookings to coexist.

## Error and Failure Scenarios

### Space Unavailability

When a booking creation or modification request specifies a space that is already booked during the requested time period, the service indicates that the space is unavailable. The response may include information about the existing booking that causes the conflict, such as the time period already reserved, helping the consumer understand why the request cannot be fulfilled and potentially choose an alternative time or space.

### Invalid Time Periods

When a booking request specifies an invalid time period, such as an end time that is before the start time, a time period in the past, or a time period that exceeds maximum booking duration, the service indicates that the time period is invalid. The response explains what makes the time period invalid and may suggest valid alternatives.

### Non-Existent Resources

When a booking request references a space that does not exist, or a modification or cancellation request references a booking that does not exist, the service indicates that the resource cannot be found. For booking modifications or cancellations, this may occur if the booking was already canceled, never existed, or has been removed from the system.

### Permission Violations

When a consumer attempts to create, modify, or cancel a booking they do not have permission to manage, the service denies the request and indicates that the operation requires appropriate permissions. For example, a user attempting to modify another user's booking would receive this response, unless they have administrative privileges.

### Concurrent Modification Conflicts

When multiple consumers attempt to modify the same booking simultaneously, or when a booking is modified while another consumer is viewing it, the service may detect these concurrent operations. The service handles this deterministically—typically by applying one modification and indicating to other consumers that the booking state has changed, requiring them to refresh their view or retry their operation.

### Booking Time Conflicts

When a booking modification request would create a conflict with another booking, the service prevents the modification and indicates the conflict. This occurs even if the original booking did not conflict, because the modified parameters would create an overlap with an existing booking. The service provides information about the conflicting booking to help the consumer understand the issue.

### Service Unavailability

If the Booking Service is temporarily unavailable, consumers cannot create, modify, or query bookings. The service should indicate its unavailability clearly, and consumers should handle this scenario appropriately. For booking creation or modification requests, consumers may need to retry the operation once the service becomes available, though they should be aware that availability may have changed during the outage.

### Invalid Booking State Transitions

When a consumer attempts to perform an operation on a booking that is in an incompatible state, the service indicates the conflict. For example, attempting to modify a booking that has already been canceled, or attempting to cancel a booking that no longer exists. The service provides information about the booking's current state to help the consumer understand why the operation cannot proceed.

### Maximum Booking Limits

When a booking request would exceed system-imposed limits, such as maximum booking duration, maximum number of concurrent bookings per user, or maximum advance booking time, the service indicates that the limit has been reached. The response explains which limit was exceeded and may provide information about the current limits to help the consumer adjust their request.


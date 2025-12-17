SpaceFlow Architecture Overview

## Platform Summary
SpaceFlow is a modular smart workplace platform composed of independently deployable backend services, a shared UI layer, and external integrations (identity providers, building systems, calendars, sensors). The platform is API‑first and contract‑driven: each service exposes a well‑defined HTTP API, documented via versioned contracts in `docs/api-contracts`, and treats those contracts as the primary boundary between teams.

The core design goal is to keep services loosely coupled but operationally simple. Each service owns its data, runs in its own container, and is orchestrated via Docker Compose rather than Kubernetes. AI capabilities are used to assist users and operators (recommendations, summaries, insights) but never act as an authoritative source of truth or an automated decision maker.

## Services and Responsibilities

- **Gateway / API Edge (if applicable in deployment)**  
  - Terminates external requests from web/mobile clients.  
  - Performs coarse‑grained routing to downstream services based on API contracts.  
  - Handles cross‑cutting concerns such as authentication, rate limiting, and basic request/response logging.

- **Booking Service**  
  - System of record for all space, desk, and room bookings.  
  - Manages availability, conflicts, recurring reservations, and policy enforcement (capacity limits, access rules).  
  - Publishes booking events (created/updated/cancelled) for downstream consumers such as analytics and occupancy.

- **Occupancy Service**  
  - Tracks real‑time and historical occupancy for spaces using sensor data and events from building systems.  
  - Provides APIs to query current occupancy, utilization over time, and derived metrics (e.g., peak usage windows).  
  - Correlates occupancy signals with booking data to detect no‑shows, over‑capacity, and underutilization patterns.

- **Analytics Service**  
  - Aggregates data from booking, occupancy, and (optionally) external systems into analytical views.  
  - Computes KPIs such as utilization, attendance vs. bookings, popular spaces, and trend analyses.  
  - Exposes read‑optimized APIs for dashboards, reports, and downstream consumers like the AI Engine.

- **AI Engine**  
  - Provides advisory capabilities such as recommendations, natural‑language insights, and scenario analysis.  
  - Consumes data from Booking, Occupancy, and Analytics via their APIs rather than direct database access.  
  - Returns suggestions and narratives (e.g., “optimize desk allocation,” “reconfigure underused spaces”) that require explicit user or admin acceptance before any operational change occurs.  
  - All AI outputs are treated as non‑authoritative; they can inform decisions but cannot mutate core systems without a separate, explicit call to the owning service.

- **Supporting Services (examples, may be split or consolidated)**  
  - **Identity / Access**: Integrates with SSO / IdPs, issues tokens, and centralizes tenant/user/role management, while each service enforces authorization on its own APIs.  
  - **Notification**: Sends email, push, or chat notifications in response to events from other services.  
  - **Integration Adapters**: Connect to building management systems, calendars, and sensor platforms, normalizing external data into the internal API contracts.

## Conceptual Data Flow

1. **User and System Inputs**  
   - End users interact with the platform via web/mobile clients, primarily through APIs exposed by the Booking and analytics‑facing endpoints.  
   - Sensor gateways, building systems, and calendar integrations push occupancy and schedule data into the Occupancy and Integration services.

2. **Operational Data Path**  
   - Booking requests are validated and persisted by the Booking Service, which becomes the system of record for reservations.  
   - Occupancy Service ingests sensor and event data, normalizes it, and maintains a time‑series view of space usage.  
   - Both Booking and Occupancy expose APIs that reflect the current operational state and emit events for downstream processing.

3. **Analytical and AI Path**  
   - Analytics Service periodically pulls or receives events from Booking and Occupancy to build aggregated metrics and trends.  
   - AI Engine calls Analytics, Booking, and Occupancy APIs to assemble a domain view, then generates advisory outputs.  
   - Any action derived from AI recommendations (e.g., modifying booking policies, reconfiguring spaces) must be explicitly executed via the relevant service’s API by a user or automation that applies explicit business rules.

4. **Presentation and Feedback**  
   - Dashboards and reports consume Analytics and AI Engine APIs to present insights to workplace admins and stakeholders.  
   - Users may accept, ignore, or override AI guidance; accepted recommendations result in explicit API calls back to Booking, Occupancy, or Integration services, maintaining clear ownership of state changes.

## Key Architectural Decisions and Trade‑offs

- **Independent Services with Strict Data Ownership**  
  - Each service owns its database and does not share schemas or direct database connections with others.  
  - This improves autonomy, scalability, and failure isolation at the cost of more explicit data duplication and integration via APIs.

- **API‑First, Contract‑Driven Design**  
  - APIs and contracts in `docs/api-contracts` are treated as first‑class artifacts, enabling parallel work across teams and clearer integration with external systems.  
  - Changes to contracts require coordination and versioning, trading some agility for predictability and backward compatibility.

- **AI as Advisory Only**  
  - AI Engine never acts as an authoritative source of truth and cannot mutate core data stores directly.  
  - This reduces risk (no opaque automated changes to critical systems) and improves auditability, at the cost of requiring additional steps for users or automation to operationalize AI suggestions.

- **Operational Simplicity over Maximum Flexibility**  
  - Orchestration is done with Docker Compose instead of Kubernetes, making local development and small‑scale deployments simpler.  
  - This favors straightforward operations and lower cognitive load but may require revisiting some decisions if the platform needs large‑scale multi‑cluster deployments in the future.

- **Explicit Integration Boundaries**  
  - External systems (sensors, BMS, calendars, IdPs) integrate via dedicated adapter services and documented APIs.  
  - This avoids tight coupling to any single vendor ecosystem at the cost of building and maintaining translation layers.

Overall, SpaceFlow’s architecture emphasizes clear service boundaries, contract‑driven collaboration, and operational simplicity, with AI used as a powerful advisor layered on top of reliable, auditable core systems.








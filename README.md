SpaceFlow
=========

SpaceFlow is a modular, service-oriented platform for managing modern workplaces. It focuses on **booking**, **occupancy**, **analytics**, and **AI-assisted workflows** around physical spaces, while keeping each concern isolated in its own service.

## Purpose

- **Optimize space usage**: Understand how meeting rooms, desks, and collaboration areas are actually used.
- **Streamline booking flows**: Provide reliable booking and scheduling primitives that other clients and systems can build on.
- **Enable data-driven decisions**: Offer analytics over utilization, trends, and anomalies.
- **Augment operations with AI**: Use an AI engine for higher-level insights and automation while keeping it strictly API-driven and replaceable.

## Services and Responsibilities

All services live under `services/`, are independently deployable, and own their data and persistence.

- **AI Engine (`services/ai-engine`)**
  - Provides AI-backed capabilities via a well-defined HTTP API.
  - Consumes events and data from other services (e.g., bookings, occupancy, analytics aggregates) to generate insights or recommendations.
  - Designed to be replaceable or upgradable without impacting core transactional flows.

- **Booking Service (`services/booking-service`)**
  - Owns all booking and reservation workflows for spaces (rooms, desks, etc.).
  - Exposes APIs for creating, updating, and cancelling bookings.
  - Enforces core domain rules around time conflicts, capacity, and basic validation.

- **Analytics Service (`services/analytics-service`)**
  - Aggregates data from transactional systems (bookings, occupancy) into query-friendly views.
  - Provides utilization metrics, trends, and reports through a read-optimized API.
  - Isolates analytical workloads from transactional services to avoid cross-impact.

- **Occupancy Service (`services/occupancy-service`)**
  - Tracks real-time and historical occupancy signals (e.g., sensor data, check-ins).
  - Serves APIs for current occupancy state and time series per space.
  - Acts as the source of truth for actual usage vs. scheduled bookings.

## Key Architectural Decisions

- **Service Independence**
  - Each service is deployed independently and owns its own data store.
  - No shared databases and no shared application code across services.
  - Integration happens exclusively through **explicit APIs** and well-defined contracts in `docs/api-contracts/`.

- **API-First Design**
  - API contracts are defined and versioned before implementation.
  - Documentation under `docs/api-contracts/` is the primary interface for clients and for service-to-service interaction.
  - Backwards compatibility is treated as an explicit design concern.

- **Simple, Explicit Infrastructure**
  - Containerization via Docker for each service.
  - **Docker Compose** is the only orchestration mechanism for local and simple multi-service setups.
  - No Kubernetes, service mesh, or hidden frameworks; infrastructure choices are deliberately minimal.

- **Clear Boundaries and Boring Code**
  - Each service is responsible for a single cohesive domain area.
  - Preference for clear, readable implementations over abstractions or clever patterns.
  - Configuration is explicit (environment variables, config files) rather than convention-based magic.

## Running Locally with Docker Compose

Prerequisites:
- Docker and Docker Compose installed on the host machine.

To build and start all core services:

```bash
docker-compose up --build
```

Notes:
- Services are defined in `docker-compose.yml` with separate containers per service.
- Each service exposes its own HTTP port; see `docker-compose.yml` and service-specific `README.md` files for endpoints and credentials, if any.
- Logs are emitted per container; you can focus on a single service with:

```bash
docker-compose logs -f <service-name>
```

To stop and remove containers:

```bash
docker-compose down
```

## Intentional Out-of-Scope Areas

The current scope of SpaceFlow **does not** include:

- **End-user UI**: No production-ready web or mobile frontends; the focus is on service APIs and contracts.
- **Production-grade IAM and SSO**: Authentication and authorization are intentionally minimal or stubbed; any real deployment is expected to integrate with an organizational identity provider.
- **Billing, invoicing, and chargeback**: Financial workflows are not modeled; analytics focus on utilization and operational metrics only.
- **IoT device management**: The platform assumes occupancy and sensor data ingress exists but does not manage device lifecycle, firmware, or provisioning.
- **Complex orchestration tooling**: No Kubernetes, service mesh, or autoscaling logic; scale-out concerns are left to the deployment environment.

This repository is intended to demonstrate clear service boundaries, API-first contracts, and pragmatic infrastructure choices for a smart workplace platform, rather than to be a fully featured product.


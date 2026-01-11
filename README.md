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

## CI/CD Pipeline

The CI pipeline (`.github/workflows/ci.yml`) runs on every push and pull request with three main jobs:

1. **Lint**: Runs frontend linter (optional, continues on error)
2. **Test**: Runs Maven tests for all backend services in parallel
3. **Docker Build**: Builds Docker images for all services

### How CI Works

- **Deterministic builds**: Each service is built explicitly with `docker build -f <service>/Dockerfile <service>`
- **Fail-fast validation**: CI verifies all Dockerfiles exist before attempting builds
- **Plain Docker**: Uses standard `docker build` (not buildx) to avoid unnecessary complexity
- **Working directories**: All commands use explicit `working-directory` to avoid path confusion

### Why These Choices

- **Explicit paths**: Every Dockerfile path is hardcoded to prevent "file not found" errors
- **No buildx**: We don't need multi-platform builds or registry pushes in CI, so plain `docker build` is sufficient
- **Separate test/build**: Tests run before Docker builds to catch issues early without building images
- **Matrix strategy**: Backend services are tested in parallel for faster feedback

## Running Locally

### Quick Start (Recommended)

**Prerequisites:**
- Docker Desktop (includes Docker and Docker Compose)
- 8GB+ RAM available for Docker
- Ports 3000, 5432, 8080-8084 available

**Start the entire platform:**

```bash
docker-compose up --build
```

This single command will:
1. Build all service images
2. Start PostgreSQL database
3. Wait for database readiness
4. Start all backend services with health checks
5. Start the frontend after all dependencies are healthy

**Platform URLs:**
- **Frontend**: http://localhost:3000
- **Auth Service**: http://localhost:8080
- **Booking Service**: http://localhost:8081
- **Occupancy Service**: http://localhost:8082
- **Analytics Service**: http://localhost:8083
- **AI Engine**: http://localhost:8084

**Verify services are running:**
```bash
# Check all service health
docker-compose ps

# View logs for a specific service
docker-compose logs -f auth-service

# View all logs
docker-compose logs -f
```

**Stop the platform:**
```bash
docker-compose down
```

**Clean restart (removes volumes):**
```bash
docker-compose down -v
docker-compose up --build
```

### First Run Checklist

After running `docker-compose up --build`, verify:

1. **All containers are healthy:**
   ```bash
   docker-compose ps
   ```
   All services should show "healthy" status.

2. **Frontend is accessible:**
   - Open http://localhost:3000 in your browser
   - You should see the SpaceFlow homepage

3. **Backend services respond:**
   ```bash
   # Test auth service
   curl http://localhost:8080/api/v1/health
   
   # Test analytics service
   curl http://localhost:8083/api/v1/health
   
   # Test AI engine
   curl http://localhost:8084/api/v1/health
   ```

4. **Database is initialized:**
   - Auth service will automatically create schema on first startup
   - Check logs: `docker-compose logs auth-service | grep -i "started"`

### Troubleshooting

#### Port Already in Use

**Error:** `Bind for 0.0.0.0:XXXX failed: port is already allocated`

**Solution:**
- Find what's using the port:
  ```bash
  # Windows
  netstat -ano | findstr :8080
  # Linux/Mac
  lsof -i :8080
  ```
- Stop the conflicting service or change the port in `docker-compose.yml`

#### Services Not Starting / Health Checks Failing

**Symptoms:** Containers restart repeatedly or show "unhealthy" status

**Solutions:**
1. **Check service logs:**
   ```bash
   docker-compose logs <service-name>
   ```

2. **Verify database is ready:**
   ```bash
   docker-compose logs auth-db
   # Should see "database system is ready to accept connections"
   ```

3. **Increase health check timeout:**
   - Some systems need more time for first startup
   - Edit `start_period` in `docker-compose.yml` healthcheck sections

4. **Rebuild from scratch:**
   ```bash
   docker-compose down -v
   docker system prune -f
   docker-compose up --build
   ```

#### Frontend Can't Connect to Backend

**Symptoms:** Frontend loads but API calls fail (CORS errors, connection refused)

**Solutions:**
1. **Verify backend services are running:**
   ```bash
   docker-compose ps
   ```

2. **Check frontend build args:**
   - Ensure `VITE_AUTH_API_BASE_URL`, `VITE_ANALYTICS_API_BASE_URL`, and `VITE_AI_ENGINE_API_BASE_URL` are set in `docker-compose.yml`
   - Rebuild frontend: `docker-compose up --build frontend`

3. **Test backend endpoints directly:**
   ```bash
   curl http://localhost:8080/api/v1/health
   curl http://localhost:8083/api/v1/health
   curl http://localhost:8084/api/v1/health
   ```

#### Login Authentication Errors

**Error:** "Unable to sign in. Please check your credentials and try again."

**Default Credentials:**
- Email: `admin@spaceflow.local`
- Password: `admin123`

**Solutions:**
1. **Check if default user was created:**
   ```bash
   docker-compose logs auth-service | grep -i "admin\|default\|user created"
   ```
   You should see: "✓ Default admin user created successfully!"

2. **Verify user exists in database:**
   ```bash
   docker-compose exec auth-db psql -U spaceflow -d spaceflow_auth -c "SELECT email, role, status FROM users;"
   ```

3. **Reset database and recreate user:**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```
   This will delete all data and recreate the default user on startup.

4. **Check auth-service logs for errors:**
   ```bash
   docker-compose logs auth-service
   ```
   Look for any exceptions or errors during user creation.

5. **Manually verify the user:**
   ```bash
   # Check user count
   docker-compose exec auth-db psql -U spaceflow -d spaceflow_auth -c "SELECT COUNT(*) FROM users;"
   
   # Check specific user
   docker-compose exec auth-db psql -U spaceflow -d spaceflow_auth -c "SELECT email, role, status FROM users WHERE email = 'admin@spaceflow.local';"
   ```

#### Database Connection Errors

**Error:** `Connection to auth-db:5432 refused` or `FATAL: database "spaceflow_auth" does not exist`

**Solutions:**
1. **Wait for database to be ready:**
   - Auth service waits for database health check
   - Check: `docker-compose logs auth-db | grep "ready"`

2. **Reset database:**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

3. **Manual database check:**
   ```bash
   docker-compose exec auth-db psql -U spaceflow -d spaceflow_auth -c "SELECT 1;"
   ```

#### Docker Build Failures

**Error:** `failed to solve: process "/bin/sh -c ..." did not complete successfully`

**Solutions:**
1. **Clear Docker cache:**
   ```bash
   docker system prune -a
   docker-compose build --no-cache
   ```

2. **Check disk space:**
   ```bash
   docker system df
   ```

3. **Verify Dockerfile paths:**
   - Ensure all `context` and `dockerfile` paths in `docker-compose.yml` are correct
   - Check that Dockerfiles exist in each service directory

#### Out of Memory Errors

**Symptoms:** Containers killed, "OOMKilled" in `docker-compose ps`

**Solutions:**
1. **Increase Docker memory limit:**
   - Docker Desktop → Settings → Resources → Memory
   - Set to at least 8GB

2. **Reduce concurrent services:**
   - Start services individually to identify memory-heavy services
   - Consider running some services locally instead

### Alternative: Local Development (Frontend Only)

**Prerequisites:**
- Node.js 20+
- Backend services running (via Docker Compose or individually)

**Setup:**

1. Create `frontend/.env.local`:
```bash
# Frontend environment variables for local development
VITE_AUTH_API_BASE_URL=http://localhost:8080
VITE_ANALYTICS_API_BASE_URL=http://localhost:8083
VITE_AI_ENGINE_API_BASE_URL=http://localhost:8084
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start dev server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173 and connect to backend services on their exposed ports.

**Why separate env file?**
- Vite embeds environment variables at build time
- `.env.local` is gitignored, so each developer can customize
- Docker Compose uses build args to set these values during image build

### Option 3: Backend Services Individually

**Prerequisites:**
- Java 17
- Maven 3.9+
- PostgreSQL (for auth-service)

**Run tests:**
```bash
cd services/<service-name>
mvn clean test
```

**Build and run:**
```bash
cd services/<service-name>
mvn clean package
java -jar target/<service-name>-*.jar
```

## Service Communication

### How Services Talk to Each Other

**In Docker Compose:**
- Services use Docker Compose service names as hostnames
- Example: `ai-engine` connects to `analytics-service:8080` (not `localhost:8083`)
- This works because containers are on the same Docker network

**From Browser (Frontend):**
- Browser requests must use `localhost` with exposed ports
- Example: Frontend calls `http://localhost:8080` for auth-service
- This is because the browser runs on the host machine, not in Docker

**Key Principle:**
- **Server-to-server**: Use service names (`analytics-service:8080`)
- **Browser-to-server**: Use localhost with exposed ports (`localhost:8080`)

### Service Dependencies

- **auth-service** → `auth-db` (PostgreSQL)
- **ai-engine** → `analytics-service` (HTTP API)
- **frontend** → `auth-service`, `analytics-service`, `ai-engine` (HTTP APIs)

All other services are independent and can run standalone.

**Startup Order:**
1. `auth-db` starts and becomes healthy
2. `auth-service` waits for `auth-db`, then starts
3. `analytics-service`, `booking-service`, `occupancy-service` start independently
4. `ai-engine` waits for `analytics-service`, then starts
5. `frontend` waits for `auth-service`, `analytics-service`, and `ai-engine`, then starts

## Intentional Out-of-Scope Areas

The current scope of SpaceFlow **does not** include:

- **End-user UI**: No production-ready web or mobile frontends; the focus is on service APIs and contracts.
- **Production-grade IAM and SSO**: Authentication and authorization are intentionally minimal or stubbed; any real deployment is expected to integrate with an organizational identity provider.
- **Billing, invoicing, and chargeback**: Financial workflows are not modeled; analytics focus on utilization and operational metrics only.
- **IoT device management**: The platform assumes occupancy and sensor data ingress exists but does not manage device lifecycle, firmware, or provisioning.
- **Complex orchestration tooling**: No Kubernetes, service mesh, or autoscaling logic; scale-out concerns are left to the deployment environment.

This repository is intended to demonstrate clear service boundaries, API-first contracts, and pragmatic infrastructure choices for a smart workplace platform, rather than to be a fully featured product.


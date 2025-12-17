# Frontend Environment Setup

## Local Development

For local development with `npm run dev`, create a `.env.local` file in the `frontend/` directory:

```bash
# Frontend Environment Variables for Local Development
# This file is gitignored and should not be committed

# Auth Service API Base URL
# Backend service runs on localhost:8080 (exposed port from docker-compose)
VITE_AUTH_API_BASE_URL=http://localhost:8080

# Analytics Service API Base URL
# Backend service runs on localhost:8083 (exposed port from docker-compose)
VITE_ANALYTICS_API_BASE_URL=http://localhost:8083
```

## Docker Compose

When building the frontend via Docker Compose, environment variables are set via build arguments in `docker-compose.yml`. The frontend container is built with:

- `VITE_AUTH_API_BASE_URL=http://localhost:8080`
- `VITE_ANALYTICS_API_BASE_URL=http://localhost:8083`

These values are embedded at build time into the client bundle.

## Why localhost?

The frontend makes client-side (browser) requests. Since the browser runs on your host machine, it cannot resolve Docker service names like `auth-service`. Instead, it must use `localhost` with the ports exposed by Docker Compose.

## Production Considerations

For production deployments, you would typically:
1. Set these environment variables in your CI/CD pipeline
2. Use a reverse proxy or API gateway
3. Configure CORS appropriately on backend services


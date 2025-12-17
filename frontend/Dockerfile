FROM node:20 AS build

WORKDIR /app

# Accept build arguments for Vite environment variables
# These are embedded at build time into the client bundle
ARG VITE_AUTH_API_BASE_URL
ARG VITE_ANALYTICS_API_BASE_URL

# Set as environment variables for Vite to pick up during build
ENV VITE_AUTH_API_BASE_URL=${VITE_AUTH_API_BASE_URL}
ENV VITE_ANALYTICS_API_BASE_URL=${VITE_ANALYTICS_API_BASE_URL}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


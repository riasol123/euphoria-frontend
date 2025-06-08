# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variable for build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the app
RUN npm run build

# Production stage - using serve instead of nginx
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built assets from build stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Start serve
CMD ["serve", "-s", ".", "-l", "80"] 
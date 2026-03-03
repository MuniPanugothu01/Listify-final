# ═══════════════════════════════════════════════════════════════════
# Listify — API Server (Production)
# Multi-stage build: install → prune dev deps → slim runtime image
# ═══════════════════════════════════════════════════════════════════

# ---------- Stage 1 : install dependencies ----------
FROM node:22-alpine AS deps

# vips runtime needed by sharp prebuilt binary
RUN apk add --no-cache vips

WORKDIR /app

COPY package.json package-lock.json* ./

# Remove Windows-generated lockfile so npm resolves sharp's prebuilt
# linux-musl binary instead of trying to build from source (npm/cli#4828).
RUN rm -f package-lock.json && \
    npm install --no-audit --no-fund && \
    npm prune --omit=dev

# ---------- Stage 2 : production image ----------
FROM node:22-alpine AS runner

LABEL maintainer="Listify <dev@listify.app>"
LABEL description="Listify API production image"

# Security: run as non-root
RUN addgroup -S listify && adduser -S listify -G listify

# sharp runtime dependency
RUN apk add --no-cache vips

WORKDIR /app

# Copy production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Remove dev/test files that shouldn't be in production
RUN rm -rf tests/ .env .env.* nodemon.json

# Create logs directory (writable by app user)
RUN mkdir -p /app/logs && chown -R listify:listify /app/logs

# Switch to non-root user
USER listify

# Express listens on 5000
EXPOSE 5000

# Health check — server exposes GET /health
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

# Graceful shutdown (SIGTERM → server.close → mongoose.close)
STOPSIGNAL SIGTERM

ENV NODE_ENV=production

CMD ["node", "server.js"]

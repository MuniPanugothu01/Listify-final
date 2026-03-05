# ═══════════════════════════════════════════════════════════════════
# Listify — React Client (Production)
# Multi-stage: install → build → serve via nginx
# ═══════════════════════════════════════════════════════════════════

# ---------- Stage 1 : install + build ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

# Install deps — delete Windows-generated lockfile so npm resolves ALL
# platform-specific optional binaries (rollup, lightningcss, tailwind oxide,
# esbuild, etc.) fresh for Alpine linux-musl (npm/cli#4828 workaround).
RUN rm -f package-lock.json && npm install --no-audit --no-fund

# Copy source after deps (better layer cache)
COPY . .

# Build-time env vars (Vite bakes VITE_* into the bundle)
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

RUN npm run build

# ---------- Stage 2 : nginx serves static assets ----------
FROM nginx:1.27-alpine AS runner

LABEL maintainer="Listify <dev@listify.app>"
LABEL description="Listify React client production image"

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security: nginx master runs as root, workers as nginx user (default).
# We ensure no writable state outside /tmp.
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Health check — nginx returns the index.html on /
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]

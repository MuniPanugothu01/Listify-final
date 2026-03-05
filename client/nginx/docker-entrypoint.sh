#!/bin/sh
# ═══════════════════════════════════════════════════════════════════
# Nginx Entrypoint — conditional HTTPS
#
# 1. Substitutes ${DOMAIN} in the Nginx template
# 2. If SSL certs exist → keep the HTTPS server block
# 3. If SSL certs missing → remove the HTTPS block (HTTP only)
# 4. Start Nginx
# ═══════════════════════════════════════════════════════════════════

set -e

DOMAIN="${DOMAIN:-localhost}"
CERT_PATH="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
CONF_FILE="/etc/nginx/conf.d/default.conf"

echo "▸ Domain: ${DOMAIN}"

# Step 1: envsubst the template into the actual config
# Only substitute DOMAIN — leave other Nginx variables ($host, $uri, etc.) intact
envsubst '${DOMAIN}' < /etc/nginx/templates/default.conf.template > "${CONF_FILE}"

# Step 2: If no SSL cert, remove the HTTPS server block to prevent startup crash
if [ ! -f "${CERT_PATH}" ]; then
    echo "▸ No SSL certificate found at ${CERT_PATH}"
    echo "  → Running in HTTP-only mode"
    echo "  → To enable HTTPS, run: ./scripts/init-ssl.sh"
    # Remove everything from the HTTPS server block comment to end of file
    sed -i '/^# .* Server Block 2.*HTTPS/,$d' "${CONF_FILE}"
else
    echo "▸ SSL certificate found — HTTPS enabled"
fi

echo "▸ Starting Nginx..."

# Step 3: Execute the original Nginx entrypoint
exec nginx -g 'daemon off;'

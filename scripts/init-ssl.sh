#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# Listify — SSL Certificate Initialization Script
#
# Run this ONCE on your production server to obtain the initial
# Let's Encrypt certificate. After that, the certbot container
# handles auto-renewal every 12 hours.
#
# Prerequisites:
#   1. Domain DNS pointed to this server's public IP
#   2. Ports 80 and 443 open in firewall / security group
#   3. .env file has DOMAIN and SSL_EMAIL set
#
# Usage:
#   chmod +x scripts/init-ssl.sh
#   ./scripts/init-ssl.sh
#
# What this script does:
#   1. Starts Nginx on HTTP (port 80) to serve ACME challenges
#   2. Runs Certbot to obtain the SSL certificate
#   3. Restarts Nginx to pick up the new certificate + enable HTTPS
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

# ── Load environment variables ────────────────────────────────────
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

DOMAIN="${DOMAIN:?ERROR: DOMAIN not set in .env (e.g. DOMAIN=listify.com)}"
SSL_EMAIL="${SSL_EMAIL:?ERROR: SSL_EMAIL not set in .env (e.g. SSL_EMAIL=admin@listify.com)}"
STAGING="${SSL_STAGING:-0}"  # Set to 1 to test with Let's Encrypt staging (no rate limits)

echo "═══════════════════════════════════════════════════"
echo " Listify SSL Certificate Setup"
echo " Domain:  ${DOMAIN}"
echo " Email:   ${SSL_EMAIL}"
echo " Staging: ${STAGING}"
echo "═══════════════════════════════════════════════════"

# ── Step 1: Start Nginx on HTTP so Certbot can verify the domain ──
echo ""
echo "▸ Step 1: Starting Nginx (HTTP only) for domain verification..."
docker compose up -d client
sleep 5  # Give Nginx time to start

# ── Step 2: Obtain the certificate ────────────────────────────────
echo ""
echo "▸ Step 2: Requesting SSL certificate from Let's Encrypt..."

STAGING_ARG=""
if [ "$STAGING" = "1" ]; then
  STAGING_ARG="--staging"
  echo "  ⚠  Using Let's Encrypt STAGING environment (cert will NOT be trusted)"
fi

docker compose run --rm certbot certonly \
  --webroot \
  -w /var/www/certbot \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}" \
  --email "${SSL_EMAIL}" \
  --agree-tos \
  --no-eff-email \
  --force-renewal \
  ${STAGING_ARG}

# ── Step 3: Verify certificate was obtained ───────────────────────
echo ""
echo "▸ Step 3: Verifying certificate..."

# Check if cert exists in the Docker volume
if docker compose run --rm certbot certificates | grep -q "${DOMAIN}"; then
  echo "  ✅ Certificate obtained successfully for ${DOMAIN}"
else
  echo "  ❌ Certificate NOT found. Check the output above for errors."
  echo "  Common issues:"
  echo "    - DNS not pointing to this server's IP"
  echo "    - Port 80 blocked by firewall"
  echo "    - Domain already has too many certs (rate limited)"
  exit 1
fi

# ── Step 4: Restart everything with HTTPS enabled ─────────────────
echo ""
echo "▸ Step 4: Restarting all services with HTTPS enabled..."
docker compose down
docker compose up -d

echo ""
echo "═══════════════════════════════════════════════════"
echo " ✅ SSL Setup Complete!"
echo ""
echo " Your site is now available at:"
echo "   https://${DOMAIN}"
echo "   https://www.${DOMAIN}"
echo ""
echo " HTTP (port 80) automatically redirects to HTTPS."
echo " Certificates auto-renew every 12 hours via Certbot."
echo ""
echo " Test your SSL rating:"
echo "   https://www.ssllabs.com/ssltest/analyze.html?d=${DOMAIN}"
echo "═══════════════════════════════════════════════════"

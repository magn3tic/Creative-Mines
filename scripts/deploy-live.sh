#!/usr/bin/env bash
set -e

if [ -f "$(dirname "$0")/../.env" ]; then
  export $(grep -v '^#' "$(dirname "$0")/../.env" | xargs)
fi

if [ -z "$SHOPIFY_STORE" ] || [ -z "$LIVE_THEME_ID" ] || [ -z "$SHOPIFY_PASSWORD" ]; then
  echo "ERROR: Set SHOPIFY_STORE, SHOPIFY_PASSWORD, and LIVE_THEME_ID in your .env file"
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "ERROR: Live deploys must be from the 'main' branch. You are on '$BRANCH'."
  exit 1
fi

read -p "WARNING: This deploys to the LIVE theme. Type 'yes' to confirm: " confirm
if [ "$confirm" != "yes" ]; then
  echo "Aborted."
  exit 0
fi

echo "Deploying to LIVE theme ($LIVE_THEME_ID) on $SHOPIFY_STORE..."
shopify theme push \
  --store="$SHOPIFY_STORE" \
  --password="$SHOPIFY_PASSWORD" \
  --theme="$LIVE_THEME_ID" \
  --allow-live

echo "Done! Live theme updated."

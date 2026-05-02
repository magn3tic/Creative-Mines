#!/usr/bin/env bash
set -e

if [ -f "$(dirname "$0")/../.env" ]; then
  export $(grep -v '^#' "$(dirname "$0")/../.env" | xargs)
fi

if [ -z "$SHOPIFY_STORE" ] || [ -z "$GS_V1_THEME_ID" ] || [ -z "$SHOPIFY_PASSWORD" ]; then
  echo "ERROR: Set SHOPIFY_STORE, SHOPIFY_PASSWORD, and GS_V1_THEME_ID in your .env file"
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "Creativemines-GS-V1" ]; then
  echo "WARNING: You are on branch '$BRANCH', not 'Creativemines-GS-V1'."
  read -p "Deploy anyway? (yes/no): " confirm
  if [ "$confirm" != "yes" ]; then echo "Aborted."; exit 0; fi
fi

echo "Deploying to GS V1 theme ($GS_V1_THEME_ID) on $SHOPIFY_STORE..."
shopify theme push \
  --store="$SHOPIFY_STORE" \
  --password="$SHOPIFY_PASSWORD" \
  --theme="$GS_V1_THEME_ID" \
  --allow-live

echo "Done! Preview: https://$SHOPIFY_STORE?preview_theme_id=$GS_V1_THEME_ID"

#!/usr/bin/env bash
set -euo pipefail

# Simple helper to deploy to Vercel non-interactively when you provide
# VERCEL_TOKEN, DATABASE_URL and PAYLOAD_SECRET in the environment.
# It assumes the repo is already imported/linked in Vercel or will prompt
# for linking when run interactively.

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "ERROR: VERCEL_TOKEN not set. Create a Personal Token in Vercel and export it as VERCEL_TOKEN."
  echo "See VERCEL_SETUP.md for details."
  exit 1
fi

if [ -z "${DATABASE_URL:-}" ] || [ -z "${PAYLOAD_SECRET:-}" ]; then
  echo "ERROR: DATABASE_URL and PAYLOAD_SECRET must be set in the environment before running this script."
  echo "Example: export DATABASE_URL='postgres://...' && export PAYLOAD_SECRET='...'
See VERCEL_SETUP.md for instructions."
  exit 1
fi

echo "Linking repository/project to Vercel (if not already linked)..."
vercel link --token "$VERCEL_TOKEN" --yes || true

echo "Adding environment variables to the Vercel project (interactive may be required)..."
# NOTE: `vercel env add` asks for values interactively. We'll use the REST API or CLI with token
# if your environment prefers non-interactive; otherwise run the commands below manually.

echo "If automatic env upload fails, run these commands manually after login:\n"
echo "  vercel env add DATABASE_URL production" 
echo "  vercel env add PAYLOAD_SECRET production"
echo "  vercel env add NEXT_PUBLIC_SERVER_URL production"

echo "Attempting non-interactive deploy now..."
vercel --prod --token "$VERCEL_TOKEN" --confirm

echo "Deploy command finished. Visit your Vercel dashboard to find the deployment URL."
echo "After first deploy, set NEXT_PUBLIC_SERVER_URL to the deployment URL and redeploy."

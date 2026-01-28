# HANDOVER: Neon Development Branch Cloning Issue

## Problem Summary

The automated daily workflow to clone the development branch from production in Neon is failing because the workflows are looking for a branch named `"main"` but the actual production branch is named `"production"`.

## Current State

### Infrastructure Setup

- **Database Provider**: Neon PostgreSQL
- **Project ID**: `square-pine-01384233` ✅ (confirmed from Neon Console URL)
- **Database Branches**:
  - `production` (production branch) - This is the parent branch
  - `development` (shadow environment) - Auto-deleted daily at 3:59 AM UTC
- **Automation**: GitHub Actions workflow scheduled to recreate development branch at 4:05 AM UTC (after auto-delete)
- **Deployment**:
  - Production Vercel project linked to `main` branch
  - Development Vercel project linked to `development` branch

### Code Collections Recently Added

Two new collections have been added to the codebase but cannot be tested because database tables don't exist:

1. **Topverhalen** (`src/collections/Topverhalen.ts`) - Stories/articles with Hero/Text/Image blocks, drafts, versioning, live preview
2. **Widgets** (`src/collections/Widgets.ts`) - Widget asset management with creator tracking

Both collections are properly configured in `src/payload.config.ts` and build successfully (no TypeScript errors).

### Workflow Files

Two GitHub Actions workflows exist:

1. **`.github/workflows/sync-dev-database.yml`** (Automated Daily)
   - Scheduled: `5 4 * * *` (4:05 AM UTC)
   - Purpose: Create fresh development branch from main after Neon's auto-delete
   - Recent Fix Applied: Added step to fetch main branch ID via API (because `parent_id` requires branch ID, not branch name)

2. **`.github/workflows/manual-clone-dev-branch.yml`** (Manual Trigger)
   - Purpose: Manually create development branch on-demand
   - Status: Created but failed on first run

### The Exact Problem

**Workflow Failure on Manual Trigger**:

```
Run echo "Fetching main branch ID from Neon..."
...
Error: Could not find main branch ID
```

**Root Cause**: The workflows search for a branch named `"main"` using:

```bash
jq -r '.branches[] | select(.name == "main") | .id'
```

But the actual production branch in Neon is named **`"production"`**, not `"main"`.

**Evidence from Neon Console**:

- Project ID in URL: `square-pine-01384233` ✅
- Parent branch of development: **`production`** (not `main`)
- This causes the jq query to return empty/null, making the workflow fail

## Required Next Steps

### 1. Fix Workflow Branch Names (CRITICAL) ✅ COMPLETED

**Problem**: Workflows looked for `"main"` branch but production branch is named `"production"`

**Solution Applied**: Updated both workflows:

- `.github/workflows/sync-dev-database.yml`
- `.github/workflows/manual-clone-dev-branch.yml`

Changed all references from `"main"` to `"production"` in the jq queries.

### 2. Verify GitHub Actions Variables ✅ CORRECT

- `NEON_PROJECT_ID`: `square-pine-01384233` (verified correct from Neon Console URL)

### 3. Verify Other GitHub Actions Secrets

Also verify these are set correctly in the same location under **Secrets**: 4. Test Manual Workflow

After fixing branch name references valid Vercel token

- `VERCEL_PROJECT_ID` - For the development Vercel project

### 3. Test Manual Workflow

After fixing `NEON_PROJECT_ID`:

- Go to GitHub Actions
- Select "Manual - Clone Development Branch from Main"
- Click "Run workflow" from `development` branch
- Wait for completion
- Copy the connection string from the workflow output

### 5. Update Local Environment

- Update `.env.local` with the new DATABASE_URL from workflow output
- Restart dev server: `pnpm dev`
- Verify Topverhalen and Widgets collections render in admin UI

### 6. Test Automated Workflow

Monitor the scheduled workflow on the next occurrence (4:05 AM UTC) to ensure:

- Production branch ID is fetched correctly
- Development branch is created successfully
- Connection string is extracted properly
- Vercel redeploy is triggered

## Technical Details

### Neon API Requirements

- **Create Branch Endpoint**: `POST /v1/projects/{project_id}/branches`
- **Required Fields**:
  - `name`: "development"
  - `parent_id`: The **actual branch ID** (not branch name), obtained from `GET /v1/projects/{project_id}/branches`

### Workflow Logic Flow

1. Fetch all branches from Neon API
2. Extract the ID of the branch named **"production"** (not "main"!)
3. Use that ID to create development branch as a clone
4. Extract postgres connection string from response
5. Update Vercel env var with new connection string
6. Trigger Vercel redeploy

## Files Modified

- `.github/workflows/sync-dev-database.yml` - Fixed to fetch **production** branch ID (not "main")
- `.github/workflows/manual-clone-dev-branch.yml` - Fixed to fetch **production** branch ID (not "main")
- `src/collections/Topverhalen.ts` - New collection (pending database schema)
- `src/collections/Widgets.ts` - New collection (pending database schema)
- `src/payload.config.ts` - Updated to include new collections
- `src/i18n/en/index.ts` and `nl/index.ts` - Added translation keys for new fields

## Success Criteria

✅ GitHub Actions variable `NEON_PROJECT_ID` confirmed correct: `square-pine-01384233`
✅ Workflows updated to search for `"production"` branch instead of `"main"`
⏳ Manual workflow runs successfully and outputs valid connection string
✅ `.env.local` updated with new development branch connection string
✅ Dev server starts without database errors
✅ Topverhalen and Widgets collections appear and render in admin UI
✅ Automated daily workflow scheduled for 4:05 AM UTC runs successfully on next cycle

## Related Context

- Production site: https://adrlab-payload.vercel.app
- Development site: https://adrlab-payload-dev.vercel.app
- Neon Project ID: `square-pine-01384233` (confirmed from Console URL)
- Neon Production Branch: `production` (not `main`)
- Last successful deployment: Before Neon development branch deletion
- Collections build successfully but cannot load because database schema doesn't exist

## Key Learning: Branch Naming Confusion

**The Original Mistake**: The handover documentation assumed the production branch was named `"main"` because that's a common convention. However, in this Neon project, the production branch is actually named `"production"`.

**How to Verify in Future**: Always check the Neon Console to see the actual branch names, or use the API:

```bash
curl -X GET "https://api.neon.tech/v1/projects/square-pine-01384233/branches" \
  -H "Authorization: Bearer $NEON_API_KEY" | jq '.branches[].name'
```

- Collections build successfully but cannot load because database schema doesn't exist

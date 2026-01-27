# Vercel setup & deploy

Short checklist and commands to deploy this project to Vercel.

Manual (recommended for first import):

- Import the repository `dgjeroen/adrlab-payload` into Vercel using the Vercel dashboard.
- In the Vercel project Settings → Environment Variables, add these variables for the `Preview` and `Production` environments as needed:
  - `DATABASE_URL` → the Neon Postgres connection string
  - `PAYLOAD_SECRET` → the secret from your `.env` (or generate one)
  - `NEXT_PUBLIC_SERVER_URL` → leave as `http://localhost:3000` for local testing; after first deploy set this to the Vercel deployment URL
- Trigger a deploy (Vercel will build using the `build` script in `package.json`).

CLI (non-interactive) — prerequisites: `vercel` CLI installed and `VERCEL_TOKEN` available

Install the CLI (if needed):

```bash
npm i -g vercel
```

Export your token and required env vars locally (example):

```bash
export VERCEL_TOKEN="<your_vercel_token>"
export DATABASE_URL="postgres://user:pw@..."
export PAYLOAD_SECRET="<your_payload_secret>"
# Optionally set NEXT_PUBLIC_SERVER_URL after the first deploy
# export NEXT_PUBLIC_SERVER_URL="https://<your-project>.vercel.app"
```

Then run the helper script:

```bash
bash ./scripts/deploy-vercel.sh
```

Notes:

- The script attempts `vercel link` and `vercel --prod` with `--token`. For the first import you may prefer the Vercel UI.
- If `vercel env add` prompts for values (interactive), add the variables through the Vercel dashboard or run `vercel env add` manually.
- After the initial deploy, copy the Vercel deployment URL and set `NEXT_PUBLIC_SERVER_URL` in the Vercel Environment Variables, then redeploy so absolute URLs and live preview work correctly.

# Muhammed Rashik — Portfolio (Next.js)

Personal portfolio built with **Next.js 15**, **React 19**, **Tailwind CSS**, and the App Router. Deployed on [Vercel](https://vercel.com) for fast, reliable global hosting.

## Quickstart (local)

1. Install dependencies:

```bash
npm install
```

2. Ensure project images are in `public/images/`:

   - `profile.jpg`
   - `Connectify.png`, `OnlineMov.png`, `Taskizo.png`, `Vegstore.png`, `credisure.png`

3. Optional: configure Google Sheets for contact messages (see [Environment variables](#environment-variables)).

4. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Development server     |
| `npm run build` | Production build       |
| `npm run start` | Serve production build |
| `npm run lint`  | ESLint                 |

## Environment variables

For production on Vercel, set these in **Project → Settings → Environment Variables**:

| Variable | Description |
| -------- | ----------- |
| `GOOGLE_CREDENTIALS` | Full service-account JSON (paste as one line) **or** use `GOOGLE_SERVICE_ACCOUNT_JSON` |
| `GOOGLE_SHEET_NAME` | Spreadsheet title (default: `Portfolio Messages`) |
| `GOOGLE_SHEET_ID` | Optional spreadsheet ID (recommended on Vercel) |

Share the sheet with the service account email. Contact submissions append rows; `/admin/messages` and `/messages` read from the same sheet.

Without Google Sheets, messages work in local dev memory only and **do not persist** on Vercel serverless.

See [`.env.example`](.env.example).

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Add environment variables above.
5. Deploy.

### Custom domain

In Vercel: **Project → Settings → Domains** → add your domain and follow DNS instructions.

No `vercel.json` is required for a standard Next.js app.

## Project layout

| Path | Purpose |
| ---- | ------- |
| `app/` | App Router pages and API routes |
| `components/` | React UI components |
| `lib/` | Site content, projects, Google Sheets helpers |
| `public/images/` | Static images |

## Customization

- Site copy: [`lib/site-content.ts`](lib/site-content.ts)
- Projects: [`lib/projects.ts`](lib/projects.ts)

## Troubleshooting local build

If `npm run build` fails with `PageNotFoundError` for routes under `app/`, Next.js may be treating a parent folder as the workspace root (for example `Documents/package-lock.json` next to this repo). Either:

- Remove or relocate that parent `package-lock.json`, or
- Run the build from a clone where this project is the repository root (Vercel does this automatically).

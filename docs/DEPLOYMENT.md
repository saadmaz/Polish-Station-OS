# Deployment

<!-- nav -->

<sub><a href="../README.md">Project README</a> · <a href="README.md">Documentation index</a></sub>

> How Polish Station POS reaches production. Part of the [project documentation](README.md).

> [!IMPORTANT]
> Hosting is moving to **Cloudflare**. The previous shared-hosting pipeline (FTPS upload to Passenger, keep-warm jobs and server maintenance) has been removed. The version currently live at [www.pos.polishstation.lk](https://www.pos.polishstation.lk) keeps running on the old host, unchanged, until the Cloudflare cut-over. Until then, merges to `main` are **not** deployed.

## Environments

| Environment   | Branch    | URL                                                          | Status                                          |
| ------------- | --------- | ------------------------------------------------------------ | ----------------------------------------------- |
| `development` | `develop` | [dev.pos.polishstation.lk](https://dev.pos.polishstation.lk) | Created with the Cloudflare setup               |
| `production`  | `main`    | [www.pos.polishstation.lk](https://www.pos.polishstation.lk) | Live on the previous host; moving to Cloudflare |

Both are GitHub Environments with their own variables and secrets. Production accepts deployments from `main` only; development from `develop` only.

### Promotion

1. Feature branches merge into `develop`.
2. A release pull request from `develop` into `main` (see [runbooks/release.md](runbooks/release.md)) promotes the change.
3. Once the Cloudflare deploy workflow exists, merging it deploys to production.

## Cloudflare migration

The app is a TanStack Start application whose server routes use `firebase-admin`. That shapes the hosting choice:

| Option                                             | What it takes                                                                                                                                                                                                                                 |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloudflare Containers** (recommended first step) | Run the existing Node server unchanged in a container. Build with `npm run build`, serve with `vite preview` or a small Node entry, and add a `Dockerfile` and `wrangler.jsonc` with a container binding. No application code changes.        |
| **Cloudflare Workers**                             | Build with TanStack Start's Cloudflare preset. Replace `firebase-admin` in `src/server/` with Firestore and Identity Toolkit REST calls signed by the service account, because `firebase-admin` does not run reliably on the Workers runtime. |

Whichever is chosen, carry these over from the previous host:

- [ ] Security headers on every response: Content Security Policy, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` and HSTS.
- [ ] `Cache-Control: public, max-age=31536000, immutable` for `/assets/*`.
- [ ] The canonical redirect from `pos.polishstation.lk` to `www.pos.polishstation.lk` (a Cloudflare Redirect Rule).
- [ ] Server environment variables from [CONFIGURATION.md](CONFIGURATION.md), stored as Worker or container secrets.
- [ ] A `deploy.yml` workflow following the shared pattern: `main` → production, `develop` → development (gated by `DEVELOPMENT_ENABLED`).
- [ ] `/healthz` responding `ok` after deploy; open tabs use it for warm-up and new-version notices.

Then point DNS for `pos.polishstation.lk` at Cloudflare, confirm staff can sign in, and retire the old host.

## Firestore and Storage rules

Rules and indexes deploy independently of hosting, through [`firebase-deploy.yml`](../.github/workflows/firebase-deploy.yml), whenever `firestore.rules`, `firestore.indexes.json` or `storage.rules` change on `main`. To deploy manually:

```sh
firebase deploy --only firestore:rules,firestore:indexes,storage
```

| Secret                          | Used by               |
| ------------------------------- | --------------------- |
| `FIREBASE_PROJECT_ID`           | `firebase-deploy.yml` |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | `firebase-deploy.yml` |

## Seed data

There are no schema migrations: Firestore is schemaless. One-time setup runs from a local machine, never automatically:

```sh
npm run seed:staff   # staff accounts with bcrypt-hashed PINs from .env
npm run seed:data    # services, customers, inventory, bookings, jobs, equipment, purchase orders
```

> [!WARNING]
> `seed:staff` overwrites every staff PIN hash. Run it once during initial setup and never again in production. `seed:data` is safe to re-run; it skips collections that already have documents unless you pass `--force`.

## Backups

- **Code:** GitHub is the source of truth; every release is tagged.
- **Firestore:** enable scheduled backups in Firebase Console → Firestore → Backups with a daily schedule and 7 to 14 days' retention. Before any risky manual data operation, run `gcloud firestore export gs://<backup-bucket>`.
- **Secrets:** keep a copy of the production environment values in the team password manager.

## Post-deployment checks

1. `/healthz` returns `ok`.
2. A staff member can sign in with their PIN, and an enrolled till can sign in offline.
3. A booking submitted from [polishstation.lk](https://www.polishstation.lk/book) appears in Bookings.
4. Response headers include the security headers listed above.

# Configuration

<!-- nav -->

<sub><a href="../README.md">Project README</a> · <a href="README.md">Documentation index</a></sub>

> Environment variables and settings for Polish Station POS. Part of the [project documentation](README.md).

Copy [`.env.example`](../.env.example) to `.env`. Never commit `.env`.

| Variable                                                               | Purpose                                                                    |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `VITE_FIREBASE_*`                                                      | Firebase web app config (public identifiers compiled into the client)      |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Service account for `firebase-admin` on the server. **Secret**             |
| `VITE_SENTRY_DSN`                                                      | Sentry error reporting                                                     |
| `RESEND_API_KEY`, `LEADS_NOTIFY_EMAIL`                                 | Lead notification email. **Secret**                                        |
| `GOOGLE_ADS_LEAD_WEBHOOK_KEY`                                          | Shared key that authenticates the Google Ads lead-form webhook. **Secret** |
| `SUPERADMIN_USERNAME`, `SUPERADMIN_PIN`                                | Bootstrap SuperAdmin used by `seed:admin`. **Secret**                      |

## Where each value lives

| Environment            | Source                                                                 |
| ---------------------- | ---------------------------------------------------------------------- |
| Local development      | `.env` copied from `.env.example`                                      |
| Continuous integration | Placeholder Firebase values in `ci.yml`; no secrets                    |
| Production build       | `production` GitHub Environment secrets (`VITE_FIREBASE_*`)            |
| Production runtime     | Cloudflare secrets for the server variables (set during the migration) |

Business settings (services, pricing, staff, devices) are managed in the app under **Settings**, not in environment variables.

<div align="center">

# Polish Station POS

**Point-of-sale and shop-management platform for Polish Station, a premium automotive detailing studio.**

Bookings, check-in, inspections, jobs, checkout, invoicing, inventory, purchasing, staff and reporting, live across every till.

[![Deploy](https://github.com/saadmaz/Polish-Station-POS/actions/workflows/deploy.yml/badge.svg)](https://github.com/saadmaz/Polish-Station-POS/actions/workflows/deploy.yml)
[![CI](https://github.com/saadmaz/Polish-Station-POS/actions/workflows/ci.yml/badge.svg)](https://github.com/saadmaz/Polish-Station-POS/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/saadmaz/Polish-Station-POS?style=flat-square&labelColor=0B0B0B&color=C9A227)](https://github.com/saadmaz/Polish-Station-POS/releases)
![Node](https://img.shields.io/badge/node-22-0B0B0B?style=flat-square)
![License](https://img.shields.io/badge/license-proprietary-0B0B0B?style=flat-square)

[Feature map](docs/FEATURES.md) · [Deployment guide](docs/DEPLOYMENT.md) · [Report a bug](https://github.com/saadmaz/Polish-Station-POS/issues/new?template=bug_report.yml)

</div>

---

## Contents

- [About](#about)
- [Modules](#modules)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Project structure](#project-structure)
- [Quality checks](#quality-checks)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Releases and versioning](#releases-and-versioning)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## About

Polish Station POS runs the day-to-day operation of the Polish Station detailing studio in Dehiwala, Sri Lanka. Staff use it on shared tills to take bookings, check vehicles in, record inspections, run jobs, take payment and manage stock, while the website feeds it leads, bookings and subscribers through a public intake API.

|                  |                                                                       |
| ---------------- | --------------------------------------------------------------------- |
| **Organisation** | Polish Station (Pvt) Ltd                                              |
| **Production**   | [pos.polishstation.lk](https://www.pos.polishstation.lk) (staff only) |
| **Contact**      | [info@polishstation.lk](mailto:info@polishstation.lk)                 |
| **Maintainer**   | [Saad Mazhar](https://github.com/saadmaz)                             |

## Modules

| Module                               | What it does                                                                                                                                                           |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sign-in**                          | Tap-your-name staff picker with a 4-digit PIN, forced PIN change on first login, lockout after failed attempts and an encrypted offline PIN fallback on enrolled tills |
| **Dashboard**                        | The day at a glance: bookings, jobs in progress, revenue and alerts                                                                                                    |
| **Bookings**                         | Calendar of bookings with booking rules, check-in and conversion to jobs                                                                                               |
| **Inspection**                       | Vehicle check-in with a damage diagram and a printable inspection report                                                                                               |
| **Jobs**                             | Work in progress from check-in to handover                                                                                                                             |
| **POS / Checkout**                   | Invoices, payments, discounts and coupons, refunds (manager and above) and WhatsApp review requests                                                                    |
| **Customers and vehicles**           | Customer profiles, vehicle history and visit records                                                                                                                   |
| **Leads, inquiries and subscribers** | Website and Google Ads lead intake with a full lead lifecycle and conversion to customers                                                                              |
| **Inventory and purchase orders**    | Stock levels, low-stock alerts and receiving against purchase orders                                                                                                   |
| **Equipment**                        | Maintenance log and costs                                                                                                                                              |
| **Notifications**                    | Reminders and follow-ups                                                                                                                                               |
| **Reports**                          | Revenue, jobs and operational reporting                                                                                                                                |
| **Staff and settings**               | Roster, roles, per-module permissions, devices and business settings                                                                                                   |

Access is controlled on two axes carried in the Firebase ID token: a **role** (`Technician < Cashier = Advisor < Manager < Admin < SuperAdmin`) and an explicit **module permission list**. The full tour, with flow diagrams, is in [docs/FEATURES.md](docs/FEATURES.md).

## Architecture

```mermaid
flowchart LR
  Tills(["Staff tills<br/>browser"]) -- Firebase Auth + live listeners --> Firestore[("Cloud Firestore")]
  Tills --> App["TanStack Start app<br/>Node 22 on Passenger"]
  Website["polishstation.lk"] -- "/api/public/*" --> App
  GoogleAds["Google Ads lead forms"] -- webhook --> App
  App -- firebase-admin --> Firestore
  App -- notifications --> Resend["Resend email"]
  Tills -. errors .-> Sentry["Sentry"]
```

- **Firestore is the single source of truth.** Every screen is a live listener, so every till sees changes from every other till in real time.
- **Sign-in is client-side** against Firebase Auth, with no server round trip on login. Deactivating or demoting a user revokes their session immediately.
- **Security rules** in [`firestore.rules`](firestore.rules) and [`storage.rules`](storage.rules) enforce roles and permissions at the data layer, with emulator-based rules tests.
- **Public intake endpoints** (`/api/public/booking`, `/contact`, `/newsletter`, `/google-leadform`) accept submissions from the website and ad platforms.

## Tech stack

| Layer         | Technology                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------ |
| Framework     | [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, server routes) |
| Language      | TypeScript                                                                                 |
| Styling       | Tailwind CSS v4 and Radix-based UI primitives                                              |
| Data and auth | Firebase (Cloud Firestore, Authentication, Storage) and `firebase-admin` on the server     |
| Email         | Resend                                                                                     |
| Monitoring    | Sentry                                                                                     |
| Build         | Vite, with the server bundled into a single file                                           |
| Hosting       | Node.js 22 on Phusion Passenger (cPanel), deployed by GitHub Actions                       |
| Tooling       | npm, Vitest, Playwright, Firebase Emulator Suite, ESLint, Prettier                         |

## Getting started

### Prerequisites

- Node.js 22 (see [`.nvmrc`](.nvmrc))
- npm 10 or later
- [Firebase CLI](https://firebase.google.com/docs/cli) for the emulators and rules tests
- Java 17 or later (required by the Firestore emulator)

### Install and run

```sh
git clone https://github.com/saadmaz/Polish-Station-POS.git
cd Polish-Station-POS
npm ci
cp .env.example .env    # fill in the Firebase web config and server credentials
npm run dev
```

Vite prints the local address when the server starts. Point `VITE_FIREBASE_*` at a development Firebase project, never production. `scripts/seed-emulator.mjs` seeds the Firebase emulators with test fixtures and refuses to run against a real project.

### Scripts

| Command                           | Description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `npm run dev`                     | Start the development server                              |
| `npm run build`                   | Production build: client, server bundle and build id      |
| `npm start`                       | Run the production server (`start.mjs`)                   |
| `npm run lint`                    | Lint with ESLint (includes Prettier rules)                |
| `npm run typecheck`               | Type-check with `tsc`                                     |
| `npm run format` / `format:check` | Format with Prettier, or check without writing            |
| `npm test`                        | Unit tests (Vitest)                                       |
| `npm run test:rules`              | Firestore security rules tests (starts the emulator)      |
| `npm run test:e2e`                | End-to-end flows against the Firestore and Auth emulators |
| `npm run deploy:rules`            | Deploy Firestore and Storage rules and indexes            |
| `npm run seed:*`, `migrate:*`     | Data seeding and one-off migrations (see `scripts/`)      |

## Configuration

Copy [`.env.example`](.env.example) to `.env`. Never commit `.env`.

| Variable                                                               | Purpose                                                                    |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `VITE_FIREBASE_*`                                                      | Firebase web app config (public identifiers compiled into the client)      |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Service account for `firebase-admin` on the server. **Secret**             |
| `VITE_SENTRY_DSN`                                                      | Sentry error reporting                                                     |
| `RESEND_API_KEY`, `LEADS_NOTIFY_EMAIL`                                 | Lead notification email. **Secret**                                        |
| `GOOGLE_ADS_LEAD_WEBHOOK_KEY`                                          | Shared key that authenticates the Google Ads lead-form webhook. **Secret** |
| `SUPERADMIN_USERNAME`, `SUPERADMIN_PIN`                                | Bootstrap SuperAdmin used by `seed:admin`. **Secret**                      |

## Project structure

```
.
├── .github/workflows/       # CI, deploy, rules deploy, keep-warm and server maintenance
├── docs/                    # Feature map, deployment, booking rules, lead lifecycle, integrations, audits
├── public/                  # Static assets
├── scripts/                 # Build helpers, seeding, migrations, rules and e2e tests
├── src/
│   ├── components/          # Feature components and Radix-based UI primitives
│   ├── hooks/               # Shared hooks: focus trap, confirmation, step-up PIN, photo queue
│   ├── lib/                 # Firebase clients, auth, domain logic (jobs, leads, inspections, money) and tests
│   ├── routes/              # File-based routes: staff app (_app.*), public API (api.public.*)
│   ├── server/              # Server-only modules
│   └── styles.css           # Design tokens and global styles
├── firestore.rules          # Data-layer security rules
├── storage.rules            # Storage security rules
├── htaccess                 # Apache / Passenger configuration deployed as .htaccess
└── start.mjs                # Production entry point
```

## Quality checks

Pull requests into `main` run the [CI workflow](.github/workflows/ci.yml): lint, formatting, type check, unit tests and a production build. Run the same checks locally before opening a pull request:

```sh
npm run lint && npm run format:check && npm run typecheck && npm test && npm run build
```

Run `npm run test:rules` whenever `firestore.rules` changes.

## Deployment

Every push to `main` deploys to production through [`deploy.yml`](.github/workflows/deploy.yml):

1. Install, type-check and build on GitHub Actions, with the Firebase web config from repository secrets.
2. Assemble a self-contained deploy package (the server is bundled, so no `node_modules` are uploaded).
3. Upload over FTPS with `lftp`, with retries.
4. Restart the app through Passenger's `tmp/restart.txt`, warm it up and run post-deploy diagnostics.

Firestore and Storage rules and indexes deploy separately through [`firebase-deploy.yml`](.github/workflows/firebase-deploy.yml) when those files change. [`keep-warm.yml`](.github/workflows/keep-warm.yml) keeps the app responsive between visits.

| Secret                                                 | Purpose                            |
| ------------------------------------------------------ | ---------------------------------- |
| `VITE_FIREBASE_*`                                      | Firebase web config for the build  |
| `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`             | FTPS upload to the hosting account |
| `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT_JSON` | Rules and index deployment         |

The server-side `.env` lives only on the host. The full runbook, including first-time server setup, zero-downtime behaviour and rollback, is in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Documentation

| Document                                                            | Covers                                                            |
| ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [FEATURES.md](docs/FEATURES.md)                                     | Every module, role and flow, with diagrams                        |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md)                                 | Hosting, environment, pipeline, zero-downtime and rollback        |
| [booking-rules-requirements.md](docs/booking-rules-requirements.md) | Booking rules and capacity                                        |
| [lead-lifecycle.md](docs/lead-lifecycle.md)                         | How leads move from intake to customer                            |
| [integrations/](docs/integrations)                                  | Contracts for the website's booking, contact and newsletter forms |
| [audits/ui-ux-audit.md](docs/audits/ui-ux-audit.md)                 | Responsive, contrast, keyboard and form-submission audit          |

## Releases and versioning

The project follows [Semantic Versioning](https://semver.org). Each release is tagged `vX.Y.Z` and published on the [Releases](https://github.com/saadmaz/Polish-Station-POS/releases) page. Notable changes are recorded in [CHANGELOG.md](CHANGELOG.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the branching model, commit conventions and pull request checklist. All participants are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please do not report security issues in public issues. See [SECURITY.md](SECURITY.md) for how to report a vulnerability privately.

## License

Copyright © 2026 Polish Station (Pvt) Ltd. All rights reserved.

This is proprietary software. The source is publicly visible, but no permission is granted to use, copy, modify or distribute it without prior written consent. See [LICENSE](LICENSE).

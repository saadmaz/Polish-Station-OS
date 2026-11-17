<div align="center">

# Polish Station POS

**Point-of-sale and shop-management platform for Polish Station.**

Bookings, check-in, inspections, jobs, checkout, invoicing, inventory, purchasing, staff and reporting, live across every till.

[![App](https://img.shields.io/badge/app-pos.polishstation.lk-374151?style=flat-square&labelColor=111827)](https://www.pos.polishstation.lk)
[![CI](https://github.com/saadmaz/Polish-Station-POS/actions/workflows/ci.yml/badge.svg)](https://github.com/saadmaz/Polish-Station-POS/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-v1.1.0-374151?style=flat-square&labelColor=111827)](https://github.com/saadmaz/Polish-Station-POS/releases)
![License](https://img.shields.io/badge/license-proprietary-374151?style=flat-square&labelColor=111827)

[**pos.polishstation.lk**](https://www.pos.polishstation.lk) · [Documentation](docs/README.md) · [Report a bug](https://github.com/saadmaz/Polish-Station-POS/issues/new?template=bug_report.yml) · [Request a change](https://github.com/saadmaz/Polish-Station-POS/issues/new?template=feature_request.yml)

</div>

---

## Contents

- [About](#about)
- [Features](#features)
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

|                  |                                                          |
| ---------------- | -------------------------------------------------------- |
| **Organisation** | Polish Station (Pvt) Ltd                                 |
| **Status**       | Live                                                     |
| **Production**   | [pos.polishstation.lk](https://www.pos.polishstation.lk) |
| **Contact**      | [info@polishstation.lk](mailto:info@polishstation.lk)    |
| **Maintainer**   | [Saad Mazhar](https://github.com/saadmaz)                |

## Features

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

A TanStack Start application on Node.js 22 under Passenger, with Cloud Firestore as the single source of truth. Every screen is a live listener, staff sign in client-side against Firebase Auth, and Firestore rules enforce roles and per-module permissions at the data layer. Public endpoints accept submissions from the website and ad platforms.

The full picture, with diagrams, is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Significant decisions are recorded as [ADRs](docs/adr/README.md).

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

Firebase web config, the server's service account, Resend, Sentry, the Google Ads webhook key and the bootstrap SuperAdmin are set in `.env`. Business settings are managed in the app under **Settings**.

Every variable, where it is set and which are secret: [docs/CONFIGURATION.md](docs/CONFIGURATION.md).

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

Every push and pull request to `main` runs the [CI workflow](.github/workflows/ci.yml): lint, formatting, type check, unit tests and a production build. Run the same checks locally before opening a pull request:

```sh
npm run lint && npm run format:check && npm run typecheck && npm test && npm run build
```

## Deployment

| Environment | Branch    | URL                                                          |
| ----------- | --------- | ------------------------------------------------------------ |
| Development | `develop` | [dev.pos.polishstation.lk](https://dev.pos.polishstation.lk) |
| Production  | `main`    | [www.pos.polishstation.lk](https://www.pos.polishstation.lk) |

The Deploy workflow builds on GitHub Actions and uploads over FTPS to Passenger. Work merges into `develop` and deploys to development; a release pull request from `develop` into `main` deploys to production.

Environments, setup, secrets and post-deployment checks are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). To release or roll back, follow the [runbooks](docs/runbooks/README.md).

## Documentation

All documentation lives in [`docs/`](docs/README.md), using the same layout in every STTPS repository.

| Document                                  | Covers                                              |
| ----------------------------------------- | --------------------------------------------------- |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md)   | How the system is built and how data flows          |
| [CONFIGURATION.md](docs/CONFIGURATION.md) | Environment variables and configuration files       |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md)       | Hosting, the delivery pipeline and first-time setup |
| [adr/](docs/adr/README.md)                | Architecture decision records                       |
| [runbooks/](docs/runbooks/README.md)      | Release and rollback procedures                     |

Product and reference documents for this project are listed in the [documentation index](docs/README.md).

## Releases and versioning

The project follows [Semantic Versioning](https://semver.org). Each release is tagged `vX.Y.Z` and published on the [Releases](https://github.com/saadmaz/Polish-Station-POS/releases) page. Notable changes are recorded in [CHANGELOG.md](CHANGELOG.md), and the release procedure is in [docs/runbooks/release.md](docs/runbooks/release.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the branching model, commit conventions and pull request checklist. All participants are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please do not report security issues in public issues. See [SECURITY.md](SECURITY.md) for how to report a vulnerability privately.

## License

Copyright © 2026 Polish Station (Pvt) Ltd. All rights reserved.

This is proprietary software. The source is publicly visible, but no permission is granted to use, copy, modify or distribute it without prior written consent. See [LICENSE](LICENSE).

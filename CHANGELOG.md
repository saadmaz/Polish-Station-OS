# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Development and production environments: `develop` deploys to development and `main` to production, through one Deploy workflow and GitHub Environments with per-environment settings.

## [1.0.0] - 2026-11-16

First versioned release of Polish Station POS, covering everything in production at [pos.polishstation.lk](https://www.pos.polishstation.lk).

### Added

- **Sign-in:** staff picker with PIN, forced PIN change on first login, lockout after failed attempts, step-up PIN confirmation for sensitive actions, immediate session revocation, and an encrypted offline PIN fallback on enrolled tills.
- **Access control:** role hierarchy from Technician to SuperAdmin, per-user module permissions carried in token claims, and data-layer enforcement in Firestore and Storage rules.
- **Bookings:** calendar, booking rules, online booking intake and check-in.
- **Inspection:** vehicle check-in with damage diagram, photos and a printable inspection report.
- **Jobs:** job tracking from check-in to handover, with handover photos.
- **POS and checkout:** invoices with plate-prefixed document numbers, payments, coupons and discounts, manager-gated refunds and WhatsApp review requests.
- **Customers and vehicles:** profiles, vehicle records and visit history.
- **Leads:** website, contact and Google Ads lead-form intake, lead lifecycle and conversion, inquiries and newsletter subscribers.
- **Inventory, purchase orders and equipment:** stock, low-stock alerts, receiving and maintenance logs.
- **Notifications, reports and dashboard metrics.**
- **Staff and settings:** roster, roles, permissions, devices and business settings.
- Public intake API for the marketing site and ad platforms.
- Accessibility: focus-trapped modals, keyboard navigation, WCAG AA contrast fixes and Enter-to-submit on every form.
- Error reporting with Sentry and lead notification email with Resend.
- Automated FTPS deployment with Passenger restart and warm-up, rules deployment, keep-warm and server maintenance workflows.
- Continuous integration on every push and pull request: lint, formatting, type check, unit tests and build.
- Project governance: proprietary licence, security policy, contribution guidelines, code of conduct, issue forms, pull request template, CODEOWNERS and Dependabot.
- Standard documentation layout shared by every STTPS repository: architecture, configuration, deployment, decision records (ADRs) and release and rollback runbooks, indexed in `docs/README.md`.

### Changed

- Documentation reorganised under `docs/`: feature map, deployment guide, integration contracts and audits.
- Source files formatted to the project Prettier configuration.

[Unreleased]: https://github.com/saadmaz/Polish-Station-POS/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/saadmaz/Polish-Station-POS/releases/tag/v1.0.0

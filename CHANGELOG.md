<a id="top"></a>

<div align="center">

<img src=".github/assets/changelog.svg" alt="Polish Station POS: Changelog" width="100%">

<br/>

<p><strong>Every notable change to this project, newest first.</strong></p>

<a href="README.md"><img alt="README" src="https://img.shields.io/badge/README-374151?style=for-the-badge&labelColor=111827"></a>
<a href="CONTRIBUTING.md"><img alt="Contributing" src="https://img.shields.io/badge/Contributing-374151?style=for-the-badge&labelColor=111827"></a>
<a href="CODE_OF_CONDUCT.md"><img alt="Code of Conduct" src="https://img.shields.io/badge/Code%20of%20Conduct-374151?style=for-the-badge&labelColor=111827"></a>
<a href="SECURITY.md"><img alt="Security" src="https://img.shields.io/badge/Security-374151?style=for-the-badge&labelColor=111827"></a>
<a href="CHANGELOG.md"><img alt="Changelog" src="https://img.shields.io/badge/Changelog-e5251f?style=for-the-badge&labelColor=111827"></a>
<a href="LICENSE.md"><img alt="License" src="https://img.shields.io/badge/License-374151?style=for-the-badge&labelColor=111827"></a>

</div>

---

<div align="center">

<a href="https://github.com/saadmaz/Polish-Station-POS/releases"><img alt="Latest release" src="https://img.shields.io/github/v/release/saadmaz/Polish-Station-POS?include_prereleases&style=flat-square&label=latest%20release&labelColor=111827&color=e5251f"></a>
<a href="https://github.com/saadmaz/Polish-Station-POS/compare/main...develop"><img alt="Changes waiting for release" src="https://img.shields.io/github/commits-difference/saadmaz/Polish-Station-POS?base=main&head=develop&style=flat-square&label=unreleased%20commits&labelColor=111827&color=374151"></a>

</div>

> [!NOTE]
> The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Each version links to its full comparison at the bottom of this page, and to its [release notes](https://github.com/saadmaz/Polish-Station-POS/releases).

## [Unreleased]

### Removed

- Shared-hosting deployment: FTPS deploy workflow, Passenger start file, Apache configuration, server bundling step, keep-warm and keep-warm cron workflows, and the server maintenance workflow. Hosting moves to Cloudflare; the live version is unchanged until the cut-over.
- Stale Bun lockfile and configuration (the project uses npm).

### Changed

- End-to-end tests serve the production build with `vite preview`.

## [1.1.3] - 2026-11-17

### Changed

- Contributing, Security Policy, Code of Conduct, License and Changelog redesigned with branded headers, navigation, tables, diagrams and callouts; the licence is now LICENSE.md.

## [1.1.2] - 2026-11-17

### Changed

- README shows the development environment as awaiting host setup until development deploys are enabled.

## [1.1.1] - 2026-11-17

### Changed

- Redesigned README with a brand banner, live release, CI and deployment badges, action buttons, feature grid, diagrams and collapsible panels.
- Navigation bars and callouts across the contributing, security, conduct and documentation pages.

## [1.1.0] - 2026-11-17

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

[Unreleased]: https://github.com/saadmaz/Polish-Station-POS/compare/v1.1.3...HEAD
[1.1.3]: https://github.com/saadmaz/Polish-Station-POS/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/saadmaz/Polish-Station-POS/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/saadmaz/Polish-Station-POS/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/saadmaz/Polish-Station-POS/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/saadmaz/Polish-Station-POS/releases/tag/v1.0.0

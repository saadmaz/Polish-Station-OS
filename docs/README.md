# Documentation

<!-- nav -->

<sub><a href="../README.md">← Back to the project README</a></sub>

Every STTPS repository uses the same documentation layout. Start with the core documents, then the decision records and runbooks.

## Core

| Document                             | Covers                                                                      |
| ------------------------------------ | --------------------------------------------------------------------------- |
| [ARCHITECTURE.md](ARCHITECTURE.md)   | How the system is built, its components and how data flows                  |
| [CONFIGURATION.md](CONFIGURATION.md) | Environment variables, configuration files and where each value lives       |
| [DEPLOYMENT.md](DEPLOYMENT.md)       | Hosting, the delivery pipeline, first-time setup and post-deployment checks |

## Decisions and operations

| Document                        | Covers                          |
| ------------------------------- | ------------------------------- |
| [adr/](adr/README.md)           | Architecture decision records   |
| [runbooks/](runbooks/README.md) | Release and rollback procedures |

## Product and reference

| Document                               | Covers                                                |
| -------------------------------------- | ----------------------------------------------------- |
| [BOOKING-RULES.md](BOOKING-RULES.md)   | Booking rules and capacity                            |
| [FEATURES.md](FEATURES.md)             | Every module, role and flow, with diagrams            |
| [LEAD-LIFECYCLE.md](LEAD-LIFECYCLE.md) | How leads move from intake to customer                |
| [audits/](audits/)                     | Point-in-time quality and accessibility audits        |
| [integrations/](integrations/)         | Contracts between this system and other STTPS systems |

## Conventions

- Top-level documents use `UPPER-KEBAB-CASE.md`; documents inside folders use `lower-kebab-case.md`.
- Update the relevant document in the same pull request as the change it describes.
- Record significant technical decisions as ADRs rather than editing older documents.

# ADR-0001: Firestore as the single source of truth with live listeners

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-06-17 |

## Decision

Store all shop data in Cloud Firestore and have every screen subscribe with live listeners.

## Alternatives considered

A REST API in front of a relational database, with polling.

## Rationale

Several tills work at once; live listeners keep every till consistent in real time without a sync layer, and Firestore rules enforce access at the data layer.

# ADR-0002: Client-side sign-in with an offline PIN fallback

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-08-17 |

## Decision

Staff sign in directly against Firebase Auth with a name picker and PIN. Enrolled tills cache an encrypted, PIN-protected credential so staff can sign in read-only during an outage.

## Alternatives considered

Server-side session login; shared till passwords.

## Rationale

Signing in without a server round trip keeps login instant, per-person PINs keep actions accountable, and the offline fallback keeps the dashboard usable when the connection drops.

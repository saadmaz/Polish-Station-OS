# ADR-0004: Host on Cloudflare

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-11-17 |

## Decision

Move hosting from shared cPanel hosting to Cloudflare, and remove the previous host's pipeline: the FTPS deploy, Passenger start file, Apache configuration, server-bundling step, keep-warm jobs and server maintenance workflow. Firestore and Storage rules keep deploying through their own workflow.

## Alternatives considered

Staying on the shared host; a dedicated virtual server.

## Rationale

The rest of the group runs on Cloudflare, and the shared host needed constant workarounds: FTP flood protection that failed deploys, idle workers that forced keep-warm jobs, and outbound connection stalls. Cloudflare removes those workarounds and puts every STTPS application on one platform. The live version stays on the previous host until the Cloudflare setup is ready; see [DEPLOYMENT.md](../DEPLOYMENT.md#cloudflare-migration).

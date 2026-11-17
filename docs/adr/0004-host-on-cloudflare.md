# ADR-0004: Host on Cloudflare

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-11-17 |

## Decision

Move hosting from shared cPanel hosting to Cloudflare, running the existing Node server unchanged in a Cloudflare Container behind a Worker, and remove the previous host's pipeline: the FTPS deploy, Passenger start file, Apache configuration, server-bundling step, keep-warm jobs and server maintenance workflow. Firestore and Storage rules keep deploying through their own workflow.

## Alternatives considered

Staying on the shared host; a dedicated virtual server; Cloudflare Workers alone, which would mean replacing `firebase-admin` with REST calls throughout the server code.

## Rationale

The rest of the group runs on Cloudflare, and the shared host needed constant workarounds: FTP flood protection that failed deploys, idle workers that forced keep-warm jobs, and outbound connection stalls. Cloudflare removes those workarounds and puts every STTPS application on one platform. A container keeps `firebase-admin` and the server code unchanged. The live version stays on the previous host until production deploys are switched on; see [DEPLOYMENT.md](../DEPLOYMENT.md).

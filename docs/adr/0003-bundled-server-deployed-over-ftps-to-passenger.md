# ADR-0003: Bundled server deployed over FTPS to Passenger

| Status   | Date       |
| -------- | ---------- |
| Accepted | 2026-09-01 |

## Decision

Bundle the server into a single file on GitHub Actions and upload only the build output over FTPS, then restart Passenger through `tmp/restart.txt`.

## Alternatives considered

Building on the server; uploading `node_modules`.

## Rationale

The shared host cannot build reliably and mirroring tens of thousands of dependency files over FTP is slow and fragile. A single bundled server makes deploys small and repeatable.

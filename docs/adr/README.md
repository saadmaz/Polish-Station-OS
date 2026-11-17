# Architecture decision records

An architecture decision record (ADR) captures one significant technical decision: what was decided, what else was considered, and why. ADRs are never edited after acceptance; a later ADR supersedes an earlier one instead.

## Writing a new ADR

1. Copy [TEMPLATE.md](TEMPLATE.md) to `NNNN-short-title.md`, using the next free number.
2. Fill it in and set the status to `Proposed`.
3. Open it in a pull request with the change it describes. It becomes `Accepted` when merged.
4. If it replaces an earlier decision, set the earlier ADR's status to `Superseded by ADR-NNNN`.

## Index

| ADR                                                                         | Decision                                                    | Status   |
| --------------------------------------------------------------------------- | ----------------------------------------------------------- | -------- |
| [0001](0001-firestore-as-the-single-source-of-truth-with-live-listeners.md) | Firestore as the single source of truth with live listeners | Accepted |
| [0002](0002-client-side-sign-in-with-an-offline-pin-fallback.md)            | Client-side sign-in with an offline PIN fallback            | Accepted |
| [0003](0003-bundled-server-deployed-over-ftps-to-passenger.md)              | Bundled server deployed over FTPS to Passenger              | Accepted |

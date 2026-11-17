# Rollback

<!-- nav -->

<sub><a href="../../README.md">Project README</a> · <a href="../README.md">Documentation index</a></sub>

> [!WARNING]
> Use this when a deploy has broken production. Restore service first, then fix the cause.

> [!NOTE]
> Application deploys are paused during the move to Cloudflare (see [DEPLOYMENT.md](../DEPLOYMENT.md)), so only Firestore rules can currently be rolled back this way.

1. Revert the bad change on `main` (`git revert <bad-commit-sha>`), open it as a pull request and merge once CI passes.
2. If a Firestore rules change caused the problem, the revert republishes the rules through **Deploy Firestore rules**.
3. Once the Cloudflare deploy exists, the same revert redeploys the application; confirm `/healthz` returns `ok` and that staff can sign in.

Afterwards, record what happened and the fix in the pull request that resolves the root cause.
